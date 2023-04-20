import { useState, useEffect } from "react";
import { ToastContainer} from 'react-toastify';
import { Searchbar } from "./Searchbar/Searchbar";
import { getApiPixabay } from "components/ApiPixabay/api";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";

const PER_PAGE = 12;

export function App() {
  const [valueSearch, setValueSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isShowBtn, setIsShowBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
        if (!valueSearch) {
      return;
    }
      const getImages = async (valueSearch, page) => {
    try {
      setIsLoading(true);
      await getApiPixabay(valueSearch, page).then(response => {
        if (response.data.hits.length < PER_PAGE) {
          setIsEmpty(true)
        }
        setImages(prevState => [...prevState, ...response.data.hits])
        if (response.data.hits.length >= PER_PAGE) {
          setIsShowBtn(true)
        } else {
          setIsShowBtn(false)
        }  
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
    };
  getImages(valueSearch, page)
  }, [page, valueSearch]);

  const handleCreateQuery = (query) => {
    setValueSearch(query);
    setImages([]);
    setPage(1);
    setIsShowBtn(false);
    setIsEmpty(false);
  };
  
  const handleLoadMore = () => {
    setPage(page + 1)
  };
  
    return (
      <div>
        <Searchbar queryValue={handleCreateQuery}></Searchbar>
        {valueSearch.trim().length > 0 && images.length > 0 && <ImageGallery images={images} />}
        {isEmpty && (<h3>There are no images...</h3>)}
        {isShowBtn && <Button loadMore={handleLoadMore} />}
        {isLoading && <Loader/>}
        <div>
        </div>
        <ToastContainer position="top-center" autoClose={3000} theme="colored"/>
      </div>
  );
};

// import { Component } from "react";
// import { ToastContainer} from 'react-toastify';
// import { Searchbar } from "./Searchbar/Searchbar";
// import { getApiPixabay } from "components/ApiPixabay/api";
// import { ImageGallery } from "./ImageGallery/ImageGallery";
// import { Button } from "./Button/Button";
// import { Loader } from "./Loader/Loader";

// export default function App () {
//   state = {
//     valueSearch: '',
//     images: [],
//     page: 1,
//     isShowBtn: false,
//     isLoading: false,
//     isEmpty: false,
//     PER_PAGE: 12,
//     isShowModal: false,
//   }

//   componentDidUpdate(_, prevState) {
//     const { valueSearch, page } = this.state;
//     if (prevState.valueSearch !== valueSearch || prevState.page !== page) {
//       this.getImages(valueSearch, page)
//     }
//   }
//   getImages = async(valueSearch, page) => {
//     try {
//       this.setState({ isLoading: true });
//       await getApiPixabay(valueSearch, page).then(response => {
//         if (response.data.hits.length < this.state.PER_PAGE) {
//           this.setState({ isEmpty: true })
//           console.log(response);
//         }
//         this.setState(prevState => ({
//           images: [...prevState.images, ...response.data.hits],
//           isShowBtn: response.data.totalHits > (prevState.images.length + response.data.hits.length)
//         }));
//       });
//     } catch (error) {
//       console.log(error);
//     } finally {
//       this.setState({ isLoading: false})
//     }
//   }

//   handleCreateQuery = (query) => {
//     this.setState({
//       valueSearch: query,
//       images: [],
//       page: 1,
//       isShowBtn: false,
//     });
//   };
  
//   handleLoadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };
  
//     const { images, isShowBtn, isLoading, valueSearch, isEmpty} = this.state;

//     return (
//       <div>
//         <Searchbar queryValue={this.handleCreateQuery}></Searchbar>
//         {valueSearch.trim().length > 0 && images.length > 0 && <ImageGallery images={images} />}
//         {isEmpty && (<h3>There are no images...</h3>)}
//         {isShowBtn && <Button loadMore={this.handleLoadMore} />}
//         {isLoading && <Loader/>}
//         <div>
//         </div>
//         <ToastContainer position="top-center" autoClose={3000} theme="colored"/>
//       </div>
//   );
// };