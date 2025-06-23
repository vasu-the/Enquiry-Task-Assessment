import EnquiryForm from "../components/EnquiryForm";

const UserDashboard = () => {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Submit an Enquiry</h2>
      <EnquiryForm />
    </div>
  );
};

export default UserDashboard;
