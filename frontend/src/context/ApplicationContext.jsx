import { createContext, useContext, useState } from "react"

const ApplicationContext = createContext()

export function ApplicationProvider({ children }) {
  const [app, setApp] = useState({
    user_id: "",
    lender_id: "lender_01",
    consent_given: false,

    // scoring
    epfo_months: 0,
    utility_repayment_rate: 0,
    comments: "",

    // explainability
    income: 0,
    employment_tenure: 0,
    utility_delay: 0,

    // fraud
    phone: "",
    pan: "",

    // document
    document_result: null
  })

  return (
    <ApplicationContext.Provider value={{ app, setApp }}>
      {children}
    </ApplicationContext.Provider>
  )
}

export function useApplication() {
  return useContext(ApplicationContext)
}
