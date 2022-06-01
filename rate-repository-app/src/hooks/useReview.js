import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({
    repositoryName,
    repositoryOwner,
    text,
    rating,
  }) => {
    const review = {
      repositoryName,
      ownerName: repositoryOwner,
      text: text,
      rating: Number(rating),
    };

    const { data } = await mutate({ variables: { review } });
  };
  return [createReview];
};

export default useReview;
