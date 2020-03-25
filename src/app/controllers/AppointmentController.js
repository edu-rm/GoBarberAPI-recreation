import * as Yup from "yup";
import { startOfHour, parseISO, isBefore } from "date-fns";
import User from "../models/User";
import Appointment from "../models/Appointment";

class AppointmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails " });
    }

    const { provider_id, date } = req.body;

    /**
     * Checking if provider_id is a provider
     */
    const isPovider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isPovider) {
      return res
        .status(401)
        .json({ error: "You can only create appointments with providers" });
    }

    /**
     * Check for past dates
     */

    // parseISO: objeto date do java script, startOfHour (inicio da hora, zera o resto)
    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: "Past dates are not permited" });
    }

    /**
     * Check date availability
     */

    const checkAvailability = await Appointment.findOne({
      where: { provider_id, canceled_at: null, date: hourStart },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: "Appintment date is not available" });
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
