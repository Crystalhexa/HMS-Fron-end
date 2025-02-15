import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
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
        const response = await fetchAppointmentDetails(appointment.appointmentId); // Use an API call to fetch data
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
  <DialogContent className="max-h-[80vh] overflow-y-auto p-6 bg-black text-white">
    <DialogHeader>
      <DialogTitle>Appointment Details</DialogTitle>
    </DialogHeader>

    <div className="space-y-4">
      {/* Basic Appointment Info */}
      <div>
        <table className="min-w-full table-auto text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left font-semibold">Appointment Info</th>
              <th className="px-4 py-2 text-left font-semibold">Details</th>
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
                <th className="px-4 py-2 text-left font-semibold">Doctor Info</th>
                <th className="px-4 py-2 text-left font-semibold">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">Name:</td>
                <td className="px-4 py-2">{medicalHistory.doctorDetails.name}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Gender:</td>
                <td className="px-4 py-2">{medicalHistory.doctorDetails.gender}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Contact Number:</td>
                <td className="px-4 py-2">{medicalHistory.doctorDetails.contactNumber}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Date of Birth:</td>
                <td className="px-4 py-2">{new Date(medicalHistory.doctorDetails.dateOfBirth).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Specialization:</td>
                <td className="px-4 py-2">{medicalHistory.doctorDetails.specialization}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Experience:</td>
                <td className="px-4 py-2">{medicalHistory.doctorDetails.yearsOfExperience} years</td>
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
                <th className="px-4 py-2 text-left font-semibold">Record Info</th>
                <th className="px-4 py-2 text-left font-semibold">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">Symptoms:</td>
                <td className="px-4 py-2">{medicalHistory.medicalRecords.symptoms}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Diagnosis:</td>
                <td className="px-4 py-2">{medicalHistory.medicalRecords.diagnosis}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Treatment Notes:</td>
                <td className="px-4 py-2">{medicalHistory.medicalRecords.treatmentNotes || "N/A"}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Allergies:</td>
                <td className="px-4 py-2">{medicalHistory.medicalRecords.allergies || "None"}</td>
              </tr>
            </tbody>
          </table>

          <h4 className="text-lg font-semibold mt-4">Prescriptions</h4>
          <table className="min-w-full table-auto text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Prescription ID</th>
                <th className="px-4 py-2 text-left font-semibold">Drug</th>
              </tr>
            </thead>
            <tbody>
              {medicalHistory.medicalRecords.prescriptions?.length > 0 ? (
                medicalHistory.medicalRecords.prescriptions.map((prescription: any) => (
                  <tr key={prescription.prescriptionId}>
                    <td className="px-4 py-2">{prescription.prescriptionId}</td>
                    <td className="px-4 py-2">
                      {prescription.drugs?.map((drug: any, index: number) => (
                        <p key={index}>{drug.drug?.drug_name}</p>
                      ))}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="px-4 py-2">No prescriptions available</td>
                </tr>
              )}
            </tbody>
          </table>
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
