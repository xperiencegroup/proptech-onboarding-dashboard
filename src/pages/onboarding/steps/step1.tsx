import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOnboardingStore } from "../../../store/formulario/useOnboardingStore";
import { step1Schema, type Step1Data } from "../../../schemas/onboardingSchema";

export default function Step1() {
  const setField = useOnboardingStore((state) => state.setField);
  const finishStep1 = useOnboardingStore((state) => state.finishStep1);
  const name = useOnboardingStore((state) => state.name);
  const phone = useOnboardingStore((state) => state.phone);
  const email = useOnboardingStore((state) => state.email);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      name,
      phone,
      email,
    },
  });

  const onSubmit = async (data: Step1Data) => {
    setField("name", data.name);
    setField("phone", data.phone);
    setField("email", data.email);
    await finishStep1(); // crea el lead en BD y avanza al step 2
  };

  return (
    <>
      {/* <!-- STEP 1: datos obligatorios --> */}
      <div className="aluna-ob-step-content" data-step="1">
        <div className="aluna-ob-question">Empecemos por conocerte</div>
        <div className="aluna-ob-helper">
          Estos son los únicos campos obligatorios. Con esto te abrimos tu folio
          y te mandamos tu información por WhatsApp y correo.
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="aluna-ob-row">
            <div className="aluna-ob-field full">
              <label className="aluna-ob-label">
                Nombre completo <span className="req">*</span>
              </label>
              <input
                {...register("name")}
                type="text"
                className="aluna-ob-input"
                id="obName"
                placeholder="Tu nombre y apellido"
                autoComplete="off"
              />
              {errors.name && (
                <span className="aluna-ob-error">{errors.name.message}</span>
              )}
            </div>
            <div className="aluna-ob-field">
              <label className="aluna-ob-label">
                Teléfono <span className="req">*</span>
              </label>
              <input
                {...register("phone")}
                type="tel"
                className="aluna-ob-input"
                id="obPhone"
                placeholder="+502 0000 0000"
                autoComplete="off"
              />
              {errors.phone && (
                <span className="aluna-ob-error">{errors.phone.message}</span>
              )}
            </div>
            <div className="aluna-ob-field">
              <label className="aluna-ob-label">
                Correo <span className="req">*</span>
              </label>
              <input
                {...register("email")}
                type="email"
                className="aluna-ob-input"
                id="obEmail"
                placeholder="tu@correo.com"
                autoComplete="off"
              />
              {errors.email && (
                <span className="aluna-ob-error">{errors.email.message}</span>
              )}
            </div>
          </div>

          <div className="aluna-ob-actions">
            <button
              type="submit"
              className="aluna-ob-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando.." : "Continuar"}
              {!isSubmitting && (
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
