import { useEffect, useState } from "react";
import { getServices } from "../../api/serviceApi";
import { createService, editService, deleteService } from "../../api/serviceApi";
import AddServiceModal from "../../components/AddServiceModal";
import EditServiceModal from "../../components/EditServiceModal";

const Services = () => {
  const [services, setServices] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState({});

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openEditModal = (service) => {
    setSelectedService(service);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const submitAddHandler = async (data) => {
    const response = await createService(data);
    setServices([...services, response.service]);
    closeAddModal();
  };

  const submitEditHandler = async (data) => {
    const response = await editService(selectedService._id, data);
    setServices(services.map((service) => (service._id === selectedService._id ? response.service : service)));
    closeEditModal();
  };

  const deleteHandler = async (serviceId) => {
    await deleteService(serviceId);
    setServices(services.filter((service) => service._id !== serviceId));
  };

  useEffect(() => {
    const fetchServices = async () => {
      const services = await getServices();
      setServices(services.services);
    };

    fetchServices();
  }, []);

  return (
    <div className="my-8 mx-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Services</h1>
        <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={openAddModal}>
          Add Service
        </button>
      </div>
      <table className="table-auto w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Service</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.length > 0 ? (
            services.map((service, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{service.name}</td>
                <td className="border px-4 py-2 flex flex-row gap-6">
                  <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={() => openEditModal(service)}>
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteHandler(service._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="border px-4 py-2 text-center">
                No services found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <AddServiceModal isOpen={isAddModalOpen} onClose={closeAddModal} onSubmit={submitAddHandler} />
      <EditServiceModal defaultValues={selectedService} isOpen={isEditModalOpen} onClose={closeEditModal} onSubmit={submitEditHandler} />
    </div>
  );
};

export default Services;
