import React from "react";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage,
MDBCardBody, MDBCardText } from "mdbreact";
import './Recommendation.css'

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
        //  console.log(url);
        // fetch(url)
        //     .then(res => res.json())
        //     .then(json => {
        //         this.setState({
        //             isLoaded: true,
        //             data: json,
        //         })
        //     });
    }

    render() {

        var { isLoaded, data } = this.state;
            isLoaded = true;
        if (!isLoaded) {
            return <div>Loading....</div>
        }

        else {
            console.log(data);
            return (
                <MDBContainer>
                    <MDBCarousel activeItem={1} length={Math.ceil(this.state.data.length/3)} slide={true} showControls={true} showIndicators={false}>
                        <MDBCarouselInner>
                            <MDBRow>
                            {
                                data.map((rec, index) => {
                                    const  str = index/3+1;
                                    if ( index %3 === 0 && index + 3 <= data.length) {

                                        return (
                                            <MDBCarouselItem itemId={str.toString()}>
                                            <Col 
                                                poster={rec.poster}
                                                rating={rec.rating}
                                            />
                                            <Col 
                                                poster={data[index+1].poster}
                                                rating={data[index+1].rating}
                                            />
                                            <Col 
                                                poster={data[index+2].poster}
                                                rating={data[index+2].rating}
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
                        Rating: {this.props.rating}
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
        );
    }
}

export default Recommendation;