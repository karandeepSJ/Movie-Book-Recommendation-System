import React from "react";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage,
MDBCardBody, MDBCardText } from "mdbreact";
import './Recommendation.css'
import axios from "axios";

class Recommendation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false, 
            data: [],
            movieDbId: this.props.movieDbId,
            bookDbId: this.props.bookDbId,
        }
    }

    componentDidMount() {
        const { movieDbId, bookDbId } = this.state;
        var url = 'http://localhost:5050/api/r/recommend?movieDbId=';
        if (movieDbId) {
            url += movieDbId;
        } else {
            url += '0'
        }
        if (bookDbId) {
            url += '&' + 'bookDbId=' + bookDbId;
        } else {
            url += '&' + 'bookDbId=0';
        }
         console.log(url);
        axios.get(url)
        .then(response => {
            this.setState({
                isLoaded: true,
                data: response.data,
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {

        var { isLoaded, data } = this.state;
        if (!isLoaded) {
            return <div>Loading Recommendations....</div>
        }

        else {
            var mov_data = data.movies;

            if(mov_data.length%3==1){
                var x = mov_data.pop();
                mov_data.push(mov_data[[mov_data.length-2]]);
                mov_data.push(mov_data[[mov_data.length-2]]);
                mov_data.push(x);
            }
            else if(mov_data.length%3==2){
                var x = mov_data.pop();
                var y = mov_data.pop();
                mov_data.push(mov_data[[mov_data.length-1]]);
                mov_data.push(x);
                mov_data.push(y);
            }
            var book_data = data.books;
            if(book_data.length%3==1){
                var x = book_data.pop();
                book_data.push(book_data[[book_data.length-2]]);
                book_data.push(book_data[[book_data.length-2]]);
                mov_data.push(x);
            }
            else if(book_data.length%3==2){
                var x = mov_data.pop();
                var y = mov_data.pop();
                book_data.push(book_data[[book_data.length-1]]);
                mov_data.push(x);
                mov_data.push(y);

            }
            console.log(mov_data)
            return (
                <div>
                <h4 className="pt-5 h4-responsive">Recommended Movies:</h4>
                <MDBContainer>
                    <MDBCarousel activeItem={1} length={Math.ceil(mov_data.length/3)} slide={true} showControls={true} showIndicators={false}>
                        <MDBCarouselInner>
                            <MDBRow>
                            {
                                mov_data.map((rec, index) => {
                                    const  str = index/3+1;
                                    if ( index %3 === 0 && index + 3 <= mov_data.length) {

                                        return (
                                            <MDBCarouselItem itemId={str.toString()}>
                                            <Col 
                                                poster={rec.poster}
                                                rating={rec.rating}
                                            />
                                            <Col 
                                                poster={mov_data[index+1].poster}
                                                rating={mov_data[index+1].rating}
                                            />
                                            <Col 
                                                poster={mov_data[index+2].poster}
                                                rating={mov_data[index+2].rating}
                                            />
                                            </MDBCarouselItem>
                                        );
                                    }
                                    else {
                                        return ""
                                    }
                                })
                            }
                            </MDBRow>
                        </MDBCarouselInner>
                    </MDBCarousel>
                </MDBContainer>
                <h4 className="pt-5 h4-responsive">Recommended Books:</h4>
                <MDBContainer>
                    <MDBCarousel activeItem={1} length={Math.ceil(book_data.length/3)} slide={true} showControls={true} showIndicators={false}>
                        <MDBCarouselInner>
                            <MDBRow>
                            {
                                book_data.map((rec, index) => {
                                    const  str = index/3+1;
                                    if ( index %3 === 0 && index + 3 <= book_data.length) {

                                        return (
                                            <MDBCarouselItem itemId={str.toString()}>
                                            <Col 
                                                poster={rec.poster}
                                                rating={rec.rating}
                                            />
                                            <Col 
                                                poster={book_data[index+1].poster}
                                                rating={book_data[index+1].rating}
                                            />
                                            <Col 
                                                poster={book_data[index+2].poster}
                                                rating={book_data[index+2].rating}
                                            />
                                            </MDBCarouselItem>
                                        );
                                    }
                                    else {
                                        return ""
                                    }
                                })
                            }
                            </MDBRow>
                        </MDBCarouselInner>
                    </MDBCarousel>
                </MDBContainer>
            </div>
            );

        }
    }
}

class Col extends React.Component {
    render() {
        return (
            <MDBCol md="4" style={{float:"left"}}>
                <MDBCard className="mb-2">
                  <MDBCardImage className="img-fluid" src={this.props.poster} />
                  <MDBCardBody>
                    <MDBCardText style={{textAlign: 'center', fontWeight:'bold'}}>
                        Rating: {this.props.rating.toFixed(2)}
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
        );
    }
}

export default Recommendation;