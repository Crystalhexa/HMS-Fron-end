"use server";

import AppointmentBar from "@/components/global/appoinment/AppointmentBar";
import { getUserFromServer } from "@/actions/auth";
import { fetchAppoinmentByDoctor } from "@/actions/appointment.action";
type Props = {};

const page = async(props: Props) => {
    const user = await getUserFromServer(); 
    console.log(user)
    const appointment = await fetchAppoinmentByDoctor(user.userId);  
  return (
    <section className="p-4">
      <AppointmentBar appointments={appointment}/>
    </section>
  );
};
export default page;