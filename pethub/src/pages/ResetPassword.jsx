import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";


const ResetPassword = () => {

    const [datainfo, setDataInfo] = useState({
        emailAddress: "",
        userName: "",
        securityAnswer: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [securityQuestion, setSelected] = useState("");

    const {
        emailAddress,
        userName,
        securityAnswer,
        newPassword,
        confirmPassword,
    } = datainfo;

    const questions = [
        { value: "What is the name of your first pet?", label: "What is the name of your first pet?"},
        { value: "What city were you born in?", label: "What city were you born in?"},
        { value: "What was the first concert you attended?", label: "What was the first concert you attended?"},
        { value: "In what city or town did your parents meet?", label: "In what city or town did your parents meet?"},
        { value: "What was the make and model of your first car?", label: "What was the make and model of your first car?"},
    ];

    const onChange = (e) => {
        setDataInfo({ ...datainfo, [e.target.name]: e.target.value });

    };
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            console.log("Passwords do not match");
            alert("Passwords do not match");
        }
        else {
            const data = {
                emailAddress: emailAddress,
                userName: userName,
                securityAnswer: securityAnswer,
                securityQuestion: securityQuestion,
                newPassword: newPassword,
                confirmPassword: confirmPassword,
            };

            try {
                const response = await axios({
                  method: "post",
                  url: "http://localhost:3001/resetpassword",
                  data: data,
                  headers: { "Content-Type": "application/json" },
                });

                if (response.status === 200) {
                  alert("New Password is created! Please sign in with it.");
                  navigate("/login");
                }
            } catch (error) {
                console.error(error);
                console.log(error);
                alert(error.response.data);
            }
        }
    };


    return (
        <div className="form-container">
            <h1>Reset Password Request</h1>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group"> 
                    <input 
                        placeholder="Email"
                        type="text"
                        name="emailAddress"
                        value={emailAddress}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input 
                        placeholder="Username"
                        type="text"
                        name="userName"
                        value={userName}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <label>Please Select Your Security Question</label>
                <div className="form-group">
                    <Select 
                        options={questions} 
                        name="securityQuestion"
                        onChange={(choice) => setSelected(choice.value)}
                        placeholder="Please select your security question"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        placeholder="Security Answer"
                        type="text"
                        name="securityAnswer"
                        value={securityAnswer}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <label>New Password</label>
                <div className="form-group"> 
                    <input 
                        placeholder="Password"
                        type="password"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input 
                        placeholder="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <input type="submit" value="Submit" onClick={(onChange)} />
            </form>
            <p>
                Need to go back? <Link to="/login">Login</Link>
            </p>
        </div>

    );
};
export default ResetPassword;