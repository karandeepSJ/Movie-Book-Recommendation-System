import React from "react";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage,
MDBCardBody, MDBCardText } from "mdbreact";
import './Recommendation.css'

class Recommendation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false, 
            data: [{"id":"5ea6805aa039fab70ec145c2","movieId":1,"title":"Toy Story","releaseYear":"1995","genres":["Adventure","Animation","Children","Comedy","Fantasy"],"imdbId":"114709","tmdbId":"862","ratingCount":215,"ratingSum":843,"rating":3.92,"originalTitle":"Toy Story","tagline":"","overview":"Led by Woody, Andy's toys live happily in his room until Andy's birthday brings Buzz Lightyear onto the scene. Afraid of losing his place in Andy's heart, Woody plots against Buzz. But when circumstances separate Buzz and Woody from their owner, the duo eventually learns to put aside their differences.","homepage":"http://toystory.disney.com/toy-story","poster":"http://image.tmdb.org/t/p/original/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg","releaseDate":"1995-10-30","runtime":81,"revenue":373554033,"backdrop":"http://image.tmdb.org/t/p/original/lxD5ak7BOoinRNehOCA85CQ8ubr.jpg","cast":[{"name":"Tom Hanks","character":"Woody (voice)","order":0,"profile":"http://image.tmdb.org/t/p/original/nRK6APnLiVNxMzqW2XglBpISksq.jpg"},{"name":"Tim Allen","character":"Buzz Lightyear (voice)","order":1,"profile":"http://image.tmdb.org/t/p/original/84VfGVV4A9C6Rb0pgsCvxSVqnX.jpg"},{"name":"Don Rickles","character":"Mr. Potato Head (voice)","order":2,"profile":"http://image.tmdb.org/t/p/original/iJLQV4dcbTUgxlWJakjDldzlMXS.jpg"},{"name":"Jim Varney","character":"Slinky Dog (voice)","order":3,"profile":"http://image.tmdb.org/t/p/original/j2De8KaACIbi4IX8WfUZGmCW1k2.jpg"},{"name":"Wallace Shawn","character":"Rex (voice)","order":4,"profile":"http://image.tmdb.org/t/p/original/tiiz0t7fFiaeoujUyejzIiLRYpu.jpg"}],"score":0.0},{"id":"5ea6805aa039fab70ec145c3","movieId":2,"title":"Jumanji","releaseYear":"1995","genres":["Adventure","Children","Fantasy"],"imdbId":"113497","tmdbId":"8844","ratingCount":111,"ratingSum":381,"rating":3.4369369,"originalTitle":"Jumanji","tagline":"Roll the dice and unleash the excitement!","overview":"When siblings Judy and Peter discover an enchanted board game that opens the door to a magical world, they unwittingly invite Alan -- an adult who's been trapped inside the game for 26 years -- into their living room. Alan's only hope for freedom is to finish the game, which proves risky as all three find themselves running from giant rhinoceroses, evil monkeys and other terrifying creatures.","homepage":"http://www.sonypictures.com/movies/jumanji/","poster":"http://image.tmdb.org/t/p/original/vgpXmVaVyUL7GGiDeiK1mKEKzcX.jpg","releaseDate":"1995-12-15","runtime":104,"revenue":262797249,"backdrop":"http://image.tmdb.org/t/p/original/y7SQmjlB42VvYyRIFQXLQ4ZYrn.jpg","cast":[{"name":"Robin Williams","character":"Alan Parrish","order":0,"profile":"http://image.tmdb.org/t/p/original/3vypmub75rLItlC51uJUurNYkW0.jpg"},{"name":"Jonathan Hyde","character":"Samuel Alan Parrish / Van Pelt","order":1,"profile":"http://image.tmdb.org/t/p/original/1jYyW3B5omvMTVfEswqQQBrHN2.jpg"},{"name":"Kirsten Dunst","character":"Judy Shepherd","order":2,"profile":"http://image.tmdb.org/t/p/original/5dI5s8Oq2Ook5PFzTWMW6DCXVjm.jpg"},{"name":"Bradley Pierce","character":"Peter Shepherd","order":3,"profile":"http://image.tmdb.org/t/p/original/j6iW0vVA23GQniAPSYI6mi4hiEW.jpg"},{"name":"Bonnie Hunt","character":"Sarah Whittle","order":4,"profile":"http://image.tmdb.org/t/p/original/uKAfrFRZYnHFAxw53Jldbs8yIZO.jpg"}],"score":0.0},{"id":"5ea6805aa039fab70ec145c4","movieId":3,"title":"Grumpier Old Men","releaseYear":"1995","genres":["Comedy","Romance"],"imdbId":"113228","tmdbId":"15602","ratingCount":52,"ratingSum":169,"rating":3.26,"originalTitle":"Grumpier Old Men","tagline":"Still Yelling. Still Fighting. Still Ready for Love.","overview":"A family wedding reignites the ancient feud between next-door neighbors and fishing buddies John and Max. Meanwhile, a sultry Italian divorcée opens a restaurant at the local bait shop, alarming the locals who worry she'll scare the fish away. But she's less interested in seafood than she is in cooking up a hot time with Max.","homepage":"","poster":"http://image.tmdb.org/t/p/original/1FSXpj5e8l4KH6nVFO5SPUeraOt.jpg","releaseDate":"1995-12-22","runtime":101,"revenue":0,"backdrop":"http://image.tmdb.org/t/p/original/vAZZrfi0xwE226zpSTAbJ7gUWwf.jpg","cast":[{"name":"Walter Matthau","character":"Max Goldman","order":0,"profile":"http://image.tmdb.org/t/p/original/fLxFSjYwXlNACb4qk7VBsz9ump1.jpg"},{"name":"Jack Lemmon","character":"John Gustafson","order":1,"profile":"http://image.tmdb.org/t/p/original/4yowflZgO62PGTPADoFzkYSrZv.jpg"},{"name":"Ann-Margret","character":"Ariel Gustafson","order":2,"profile":"http://image.tmdb.org/t/p/original/7cq76gMW4Mal5cctMLCK8wilJ6.jpg"},{"name":"Sophia Loren","character":"Maria Sophia Coletta Ragetti","order":3,"profile":"http://image.tmdb.org/t/p/original/eNhD1YhuICcfGdqTUkCSZZDU1Ly.jpg"},{"name":"Daryl Hannah","character":"Melanie Gustafson","order":4,"profile":"http://image.tmdb.org/t/p/original/4Wn3bsHa7Js7mYX0iehYN7BuHOi.jpg"}],"score":0.0}],
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