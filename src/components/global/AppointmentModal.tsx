import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClimbingBoxLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";

interface AppointmentData {
  appointmentId: string;
  adultpatient?: {
    name?: string;
    contactNumber?: string;
    email?: string;
    address?: string;
  };
  slotDate: string;
  slotTime: string;
  status: string;
}

interface AppointmentPopupProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  appointmentData: AppointmentData | null;
  loading: boolean;
  submit: () => void;
}

const AppointmentPopup: React.FC<AppointmentPopupProps> = ({ open, setOpen, appointmentData, loading, submit }) => {
  const [color] = useState("#36D7B7");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-green-500 text-white px-4 py-2 rounded">
        View Appointment Details
      </DialogTrigger>

      <DialogContent className="shad-alert-dialog max-w-lg">
        {/* Header */}
        <DialogHeader className="flex justify-between items-center border-b pb-2">
          <DialogTitle className="text-lg font-semibold">
            Appointment Details
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="max-h-[400px] overflow-y-auto p-2 space-y-4">
          {/* Display Appointment Data */}
          {appointmentData ? (
            <div className="space-y-2">
              <p>
                <strong>Appointment ID:</strong> {appointmentData.appointmentId}
              </p>
              <p>
                <strong>Patient Name:</strong> {appointmentData.adultpatient?.name || "N/A"}
              </p>
              <p>
                <strong>Slot Date:</strong> {appointmentData.slotDate.replace(/_/g, "-")}
              </p>
              <p>
                <strong>Slot Time:</strong> {appointmentData.slotTime}
              </p>
              <p>
                <strong>Status:</strong> {appointmentData.status}
              </p>
              <p>
                <strong>Contact:</strong> {appointmentData.adultpatient?.contactNumber || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {appointmentData.adultpatient?.email || "N/A"}
              </p>
              <p>
                <strong>Address:</strong> {appointmentData.adultpatient?.address || "N/A"}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No appointment data available.</p>
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="border-t pt-2">
          <Button onClick={() => setOpen(false)} className="shad-secondary-btn">
            Close
          </Button>
          <Button type="submit" onClick={submit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>

      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <ClimbingBoxLoader
            color={color}
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      <ToastContainer />
    </Dialog>
  );
};

export default AppointmentPopup;
