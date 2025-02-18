import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ClimbingBoxLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";

const AppointmentActions = ({ appointment }: { appointment: Appointment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [medicalHistory, setMedicalHistory] = useState<any>(null); // To store fetched medical data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProceed = () => {
    const appointmentId = appointment.appointmentId;
    // Handle the proceed action, e.g., update appointment status or redirect
  };

  // Fetch medical records when the dialog opens
  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchAppointmentDetails(
          appointment.appointmentId
        ); // Use an API call to fetch data
        setMedicalHistory(response); // Set the fetched data
      } catch (err) {
        setError("Failed to load medical records.");
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchMedicalHistory();
    } else {
      setMedicalHistory(null); // Clear data when closing the dialog
    }
  }, [isOpen, appointment.appointmentId]);

  const fetchAppointmentDetails = async (appointmentId: string) => {
    const response = await fetch(
      `http://localhost:3000/api/v1/medicaleRecords/getMedicalRecords/${appointmentId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch appointment details");
    }
    return response.json();
  };

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        View Details
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-lg max-w-lg w-full p-4 max-h-[80vh] overflow-y-auto p-6 bg-black text-white">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Basic Appointment Info */}
            <div>
              <table className="min-w-full table-auto text-sm">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold">
                      Appointment Info
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2">Appointment No:</td>
                    <td className="px-4 py-2">{appointment.id}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Status:</td>
                    <td className="px-4 py-2">{appointment.status}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Date:</td>
                    <td className="px-4 py-2">{appointment.slotDate}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Time:</td>
                    <td className="px-4 py-2">{appointment.slotTime}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Patient Name:</td>
                    <td className="px-4 py-2">{appointment.name}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Gender:</td>
                    <td className="px-4 py-2">{appointment.gender}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Doctor Details */}
            {medicalHistory?.doctorDetails && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Doctor Details</h3>
                <table className="min-w-full table-auto text-sm">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold">
                        Doctor Info
                      </th>
                      <th className="px-4 py-2 text-left font-semibold">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2">Name:</td>
                      <td className="px-4 py-2">
                        {medicalHistory.doctorDetails.name}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Gender:</td>
                      <td className="px-4 py-2">
                        {medicalHistory.doctorDetails.gender}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Contact Number:</td>
                      <td className="px-4 py-2">
                        {medicalHistory.doctorDetails.contactNumber}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Date of Birth:</td>
                      <td className="px-4 py-2">
                        {new Date(
                          medicalHistory.doctorDetails.dateOfBirth
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Specialization:</td>
                      <td className="px-4 py-2">
                        {medicalHistory.doctorDetails.specialization}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Experience:</td>
                      <td className="px-4 py-2">
                        {medicalHistory.doctorDetails.yearsOfExperience} years
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Medical History */}
            {medicalHistory?.medicalRecords && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Medical Record</h3>
                <table className="min-w-full table-auto text-sm">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold">
                        Record Info
                      </th>
                      <th className="px-4 py-2 text-left font-semibold">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2">Symptoms:</td>
                      <td className="px-4 py-2">
                        {medicalHistory.medicalRecords.symptoms}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Diagnosis:</td>
                      <td className="px-4 py-2">
                        {medicalHistory.medicalRecords.diagnosis}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Treatment Notes:</td>
                      <td className="px-4 py-2">
                        {medicalHistory.medicalRecords.treatmentNotes || "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Allergies:</td>
                      <td className="px-4 py-2">
                        {medicalHistory.medicalRecords.allergies || "None"}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <h4 className="text-lg font-semibold mt-4">Prescriptions</h4>
                {medicalHistory?.prescriptions?.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold">Prescriptions</h3>
                  <table className="min-w-full table-auto text-sm border-collapse border border-gray-400">
                    <thead>
                      <tr className="bg-gray-900">
                        <th className="border border-gray-400 px-4 py-2">Drug Name</th>
                        <th className="border border-gray-400 px-4 py-2">Dosage (mg)</th>
                        <th className="border border-gray-400 px-4 py-2">Duration (days)</th>
                        <th className="border border-gray-400 px-4 py-2">Frequency</th>
                      </tr>
                    </thead>
                    <tbody>
                      {medicalHistory.prescriptions.map((prescription: { drug_name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; dosage: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; duration: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; frequency: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, index: Key | null | undefined) => (
                        <tr key={index} className="border border-gray-400">
                          <td className="border border-gray-400 px-4 py-2">{prescription.drug_name}</td>
                          <td className="border border-gray-400 px-4 py-2">{prescription.dosage}</td>
                          <td className="border border-gray-400 px-4 py-2">{prescription.duration}</td>
                          <td className="border border-gray-400 px-4 py-2">{prescription.frequency}x/day</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              </div>
            )}
          </div>

          <DialogFooter className="space-x-4">
            <Button variant="outline" onClick={handleProceed}>
              Proceed
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <ClimbingBoxLoader
            color="#36D7B7"
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      <ToastContainer />
    </>
  );
};

interface Appointment {
  appointmentId: string;
  id: string;
  status: string;
  slotDate: string;
  slotTime: string;
  name: string;
  gender: string;
}

export default AppointmentActions;
