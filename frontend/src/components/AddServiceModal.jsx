import propTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema } from '../constants/validationSchemas';

const AddServiceModal = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(serviceSchema),
  });

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-96">
        {/* Header */}
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-semibold">Add Service</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          {/* Name Input */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Service Name
            </label>
            <input
              {...register("name")}
              type="string"
              id="name"
              className={`mt-1 w-full border rounded p-2 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddServiceModal

AddServiceModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired,
};