# Movie API
- search: `http://localhost:5050/api/m/movies/search?query=Toy%20Story`
- search with genre: `http://localhost:5050/api/m/movies/search?query=Toy%20Story&genre=Action`
- recommendations: `http://localhost:5050/api/m/movies/recommendations`
- movie details: `http://localhost:5050/api/m/movies/details/{movieId}`
- list of genres: `http://localhost:5050/api/m/movies/genres`

# Books API
- search: `http://localhost:5050/api/b/books/search?query=Toy%20Story`
- recommendations: `http://localhost:5050/api/b/books/recommendations`
- book details: `http://localhost:5050/api/b/books/details/{bookId}`

# User API
- login (POST, form attributes: (email, password)): `http://localhost:5050/api/u/login`