
import apiCall from '../apiCall';

const createVariantHandler = async (variantData: IVariant) => {
  const response = await apiCall({
    path: 'variants',
    method: 'POST',
  },"http://localhost:4000/variant");

  if (response.data) {
    return response.data as IVariantResponse;
  } else if (response.hasErrors) {
    return response.errors;
  }
};

export default createVariantHandler;
