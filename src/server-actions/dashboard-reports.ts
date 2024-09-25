"use server";

import AppointmentModel from "@/models/appointment-model";
import DoctorModel from "@/models/doctor-model";
import PatientModel from "@/models/patient-model";
import dayjs from "dayjs";

export const getDashboardData = async () => {
  try {
    const [
      todayAppointmentsCount,
      allAppointmentsCount,
      allDoctorsCount,
      allPatientsCount,
      todayAppointmentsData,
    ] = await Promise.all([
      AppointmentModel.countDocuments({ date: dayjs().format("YYYY-MM-DD") }),
      AppointmentModel.countDocuments(),
      DoctorModel.countDocuments(),
      PatientModel.countDocuments(),
      AppointmentModel.find({ date: dayjs().format("YYYY-MM-DD") })
        .populate("doctor")
        .populate("patient"),
    ]);

    return {
      success: true,
      data: {
        todayAppointmentsCount,
        allAppointmentsCount,
        allDoctorsCount,
        allPatientsCount,
        todayAppointmentsData: JSON.parse(
          JSON.stringify(todayAppointmentsData)
        ),
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
