import { Component } from "react";
import { ToastContainer} from 'react-toastify';
import { Searchbar } from "./Searchbar/Searchbar";
import { getApiPixabay } from "components/ApiPixabay/api";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";

export class App extends Component {
  state = {
    valueSearch: '',
    images: [],
    page: 1,
    isShowBtn: false,
    isLoading: false,
    isEmpty: false,
    PER_PAGE: 12,
    isShowModal: false,
  }

  componentDidUpdate(_, prevState) {
    const { valueSearch, page } = this.state;
    if (prevState.valueSearch !== valueSearch || prevState.page !== page) {
      this.getImages(valueSearch, page)
    }
  }
  getImages = async(valueSearch, page) => {
    try {
      this.setState({ isLoading: true });
      await getApiPixabay(valueSearch, page).then(response => {
        if (response.data.hits.length < this.state.PER_PAGE) {
          this.setState({ isEmpty: true })
          console.log(response);
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          isShowBtn: response.data.totalHits > (prevState.images.length + response.data.hits.length)
        }));
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false})
    }
  }

  handleCreateQuery = (query) => {
    this.setState({
      valueSearch: query,
      images: [],
      page: 1,
      isShowBtn: false,
    });
  };
  
  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  
  render() {
    const { images, isShowBtn, isLoading, valueSearch, isEmpty} = this.state;

    return (
      <div>
        <Searchbar queryValue={this.handleCreateQuery}></Searchbar>
        {valueSearch.trim().length > 0 && images.length > 0 && <ImageGallery images={images} />}
        {isEmpty && (<h3>There are no images...</h3>)}
        {isShowBtn && <Button loadMore={this.handleLoadMore} />}
        {isLoading && <Loader/>}
        <div>
        </div>
        <ToastContainer position="top-center" autoClose={3000} theme="colored"/>
      </div>
  );
  }
};