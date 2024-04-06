export interface registerUserProps  {
    fullName:string,
    phone:string,
    password:string
}
export interface loginUserProps {
    phone?:string,
    
    password:string
}
type qualification ={
    name:string,
    institute:string,
    passingYear:number
}
type timeSlot = {
    startingTime:string,
    endTime:string
}
type contactInfo = {
    email:string,
    phone:string,
    address:string
}
type operationalWeek = {
    start:string,
    end:string
}
export interface registerDoctorProps {
    name:string,
    qualifications:qualification[],
    gender:string,
    timeSlots:timeSlot[],
    licenseNumber:string,
    contactInfo:contactInfo,
    consultationFee:number,
    operationalWeek:operationalWeek
}