import React, { ChangeEvent, useRef, useState } from "react";
import { registerDoctorProps } from "@/types";
import TimePicker from "react-time-picker";
import axios from "axios";
import { BASE_URL } from "@/constants";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
const DoctorRegistrationForm = () => {
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(['token']);
  const imageRef = useRef<HTMLImageElement>(null);
  const router = useRouter();
  const [formData, setFormData] = useState<registerDoctorProps>({
    name: "",
    qualifications: [],
    gender: "",
    timeSlots: [],
    licenseNumber: "",
    contactInfo: { email: "", phone: "", address: "" },
    consultationFee: 0,
    operationalWeek: { start: "MON", end: "SAT" },
  });
const [imgFile,setFile]=useState(null);
const [imgUrl,setImgUrl] = useState<string|ArrayBuffer|null>('');
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formBody = new FormData();
    if(!imgFile){
        toast.error("Select one image");
        return;
    }
    formBody.append('file',imgFile);
    formBody.append('name',formData.name);
    formBody.append('qualifications',JSON.stringify(formData.qualifications));
    formBody.append('timeSlots',JSON.stringify(formData.timeSlots))
    formBody.append('gender',formData.gender);
    formBody.append('licenseNumber',formData.licenseNumber);
    formBody.append('contactInfo',JSON.stringify(formData.contactInfo));
    formBody.append('consultationFee',formData.consultationFee.toString());
    formBody.append('operationalWeek',JSON.stringify(formData.operationalWeek));
   

    console.log(formBody)
    try {
        const res = await axios.post(`${BASE_URL}/doctor/request`,formBody,{headers:{Authorization:`Bearer ${cookies.token}`,"Content-Type":"multipart/form-data"}});
        toast.success("Request Sent successfully");
        router.replace(`/doctor-registration/success?id=${res.data.data.id}`)
    } catch (error:any) {
        if(error.response){
            const {status,message} = error.response;
            toast.error(message);
        }
    }
  };
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number,
    key: any
  ) => {
    const { value } = e.target;
    const updatedData: any = { ...formData };
    if (key === "qualifications" || key === "timeSlots") {
      updatedData[key][index][e.target.name] = value;
    } else if (key === "contactInfo") {
      updatedData[key][e.target.name] = value;
    } else {
      updatedData[key] = value;
    }
    setFormData(updatedData);
  };

  const addItem = (key: string) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [key]: [...prevData[key], {}],
    }));
  };
  const removeItem = (index: number, key: string) => {
    const prevData: any = { ...formData };
    const updatedData = prevData[key].filter(
      (element: any, elementIndex: number) => index !== elementIndex
    );
    setFormData((prevData: any) => ({ ...prevData, [key]: updatedData }));
  };
  const handleImageChange = (e:any)=>{
    const file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onload = ()=>{
     setImgUrl(reader.result);
    }
    if (file) {
    
        reader.readAsDataURL(file);
      }
  }
  return (
    <>
    <ToastContainer/>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
        {/* Name */}
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => handleInputChange(e, null, "name")}
            className="w-full border rounded-md px-4 py-2"
          />
        </div>
        {/* Gender */}
        <div className="mb-4">
          <label className="block mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={(e) => handleInputChange(e, null, "gender")}
            className="w-full border rounded-md px-4 py-2"
          >
            <option value={""}>Select Gender</option>
            <option value={"MALE"}>MALE</option>
            <option value={"FEMALE"}>FEMALE</option>
          </select>
        </div>
        {/* contactInfo */}
        <div className="mb-4">
          <label className="block mb-2">Contact Info</label>

          <div className="flex flex-col gap-2">
            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                required
                type="email"
                name="email"
                value={formData.contactInfo.email}
                onChange={(e) => handleInputChange(e, null, "contactInfo")}
                className="w-full border rounded-md px-4 py-2"
              />
            </div>
            {/* Phone number */}
            <div className="mb-4">
              <label htmlFor="phone" className="block mb-2">
                Phone number
              </label>
              <input
                required
                type="tel"
                name="phone"
                value={formData.contactInfo.phone}
                onChange={(e) => handleInputChange(e, null, "contactInfo")}
                className="w-full border rounded-md px-4 py-2"
              />
            </div>
            {/* Address */}
            <div className="mb-4">
              <label htmlFor="address" className="block mb-2">
                Address
              </label>
              <input
                required
                type="text"
                name="address"
                value={formData.contactInfo.address}
                onChange={(e) => handleInputChange(e, null, "contactInfo")}
                className="w-full border rounded-md px-4 py-2"
              />
            </div>
          </div>
        </div>
        {/* Render qualifications */}
        <div>
          {formData.qualifications.map((qualification, index) => (
            <div key={index} className="mb-4">
              <label className="block mb-2">Qualification {index + 1}</label>
              <input
                defaultValue={""}
                type="text"
                name="name"
                value={qualification.name}
                onChange={(e) => handleInputChange(e, index, "qualifications")}
                className="w-full border rounded-md px-4 py-2 mb-2"
                placeholder="Name"
              />
              <input
                type="text"
                defaultValue={""}
                name="institute"
                value={qualification.institute}
                onChange={(e) => handleInputChange(e, index, "qualifications")}
                className="w-full border rounded-md px-4 py-2 mb-2"
                placeholder="Institute"
              />
              <input
                type="number"
                defaultValue={""}
                name="passingYear"
                value={qualification.passingYear}
                min={1900}
                max={new Date().getFullYear()}
                step={1}
                onChange={(e) => handleInputChange(e, index, "qualifications")}
                className="w-full border rounded-md px-4 py-2"
                placeholder="Passing Year"
              />
              <button
                type="button"
                onClick={(e) => removeItem(index, "qualifications")}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem("qualifications")}
            className="mb-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Add Qualification
          </button>
        </div>
        {/* time slots */}
        <div>
          {formData.timeSlots.map((timeSlot, index) => (
            <div key={index} className="mb-4">
              <label htmlFor="start">Starting Time</label>
              <input
                type="text"
                name="startingTime"
                value={timeSlot.startingTime}
                onChange={(e) => {
                  handleInputChange(e, index, "timeSlots");
                }}
                className="w-full border rounded-md px-4 py-2 mb-2"
              ></input>
              {/* Ending time */}
              <label htmlFor="start">Ending Time</label>
              <input
                type="text"
                name="endTime"
                value={timeSlot.endTime}
                onChange={(e) => {
                  handleInputChange(e, index, "timeSlots");
                }}
                className="w-full border rounded-md px-4 py-2 mb-2"
              ></input>
              <button
                type="button"
                onClick={(e) => removeItem(index, "timeSlots")}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem("timeSlots")}
            className="mb-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Add TimeSlot
          </button>
        </div>
        {/* license number */}
        <div className="mb-4">
          <label htmlFor="licenseNumber">Licenser Number</label>
          <input
            defaultValue={""}
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={(e) => handleInputChange(e, null, "licenseNumber")}
            className="w-full border rounded-md px-4 py-2 mb-2"
            placeholder="License Number"
          />
        </div>
        {/* consultationFee */}
        <div className="mb-4">
          <label htmlFor="consultationFee">Consultation Fee</label>
          <input
            defaultValue={""}
            type="number"
            name="consultationFee"
            value={formData.consultationFee}
            onChange={(e) => handleInputChange(e, null, "consultationFee")}
            className="w-full border rounded-md px-4 py-2 mb-2"
            placeholder="Consultation Fee"
          />
        </div>
        {/* file */}
        <div className="mb-4">
            <img src={imgUrl}></img>
            <input onChange={handleImageChange} type="file" accept="image/*" className="w-20 rounded-md"></input>
        </div>
      </form>
      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="rounded-md bg-blue-500 text-white p-2"
      >
        Submit
      </button>
    </>
  );
};

export default DoctorRegistrationForm;
