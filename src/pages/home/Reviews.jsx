import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaStar, FaRegStar } from 'react-icons/fa';
import useAxios from '../../hooks/useAxios';

const Reviews = () => {
    const axiosInstance = useAxios()
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await axiosInstance.get('/reviews');
      return res.data;
    },
  });

  const slicedReviews = reviews.slice(0, 5);

  if (isLoading) return <p className="text-center">Loading reviews...</p>;

  return (
    <section className="my-10 max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Customer Reviews</h2>

      <div className="carousel w-full space-x-4">
        {slicedReviews.map((review, index) => (
          <div key={review._id} id={`slide${index}`} className="carousel-item relative w-full flex-shrink-0">
            <div className="card w-full bg-base-100 shadow-lg border">
              <div className="card-body items-center text-center">
                <img src={review.userPhoto} alt={review.userName} className="w-16 h-16 rounded-full border" />
                <h3 className="text-lg font-semibold mt-2">{review.userName}</h3>

                <div className="flex justify-center my-2">
                  {Array.from({ length: 5 }, (_, i) =>
                    i < review.rating ? (
                      <FaStar key={i} className="text-yellow-400" />
                    ) : (
                      <FaRegStar key={i} className="text-gray-400" />
                    )
                  )}
                </div>

                <p className="italic max-w-md">{review.message}</p>
                <p className="text-sm text-gray-500 mt-1">{new Date(review.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="absolute flex justify-between transform -translate-y-1/2 left-4 right-4 top-1/2">
              <a href={`#slide${(index - 1 + slicedReviews.length) % slicedReviews.length}`} className="btn btn-circle">❮</a>
              <a href={`#slide${(index + 1) % slicedReviews.length}`} className="btn btn-circle">❯</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
