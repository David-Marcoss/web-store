import "./auth.css";
import { useContext, useEffect, useState } from "react";
import { FormInfo } from "./components/FormInfo";
import { AuthService, IAuthRegister } from "../../shared/services/api/auth/AuthService";
import { useNavigate } from "react-router-dom";
import { FormValidatios } from "./utils/FormValidations";
import { UserLoggedContext } from "../../shared/contexts";

export const AuthRegister = () => {
    const [userData, setUserData] = useState<IAuthRegister>({
        name: "",
        taxNumber: "",
        mail: "",
        phone: "",
        password: ""
    });

    const [formMsg, setFormMsg] = useState<string | null>(null);
    const [formMsgType, setFormMsgType] = useState<"success" | "fail">("success");
    const [formMsgVisible, setFormMsgVisible] = useState(false);

    const navigate = useNavigate()
    const userLogged = useContext(UserLoggedContext);

    useEffect(() => {
        if(userLogged.isAuthenticated){
            navigate("/")
        }
    })

    const setFormInfo = (formMsg: string, formMsgType: "success" | "fail", formMsgVisible: boolean) => {
        setFormMsg(formMsg);
        setFormMsgType(formMsgType);
        setFormMsgVisible(formMsgVisible);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!FormValidatios.validateEmail(userData.mail)) {
            setFormInfo("Por favor, insira um e-mail válido.", "fail", true);
            return;
        }

        if (!FormValidatios.validateTaxNumber(userData.taxNumber)) {
            setFormInfo("Por favor, insira um CPF ou CNPJ válido.", "fail", true);
            return;
        }

        if (!FormValidatios.validatePhone(userData.phone)) {
            setFormInfo("Por favor, insira um telefone válido.", "fail", true);
            return;
        }

        if (!FormValidatios.validatePassword(userData.password)) {
            setFormInfo("A senha deve ter pelo menos 6 caracteres.", "fail", true);
            return;
        }

        const result = await AuthService.register(userData)
        if(!result.success){
            setFormInfo(result.message, "fail", true);
            return
        }

        setFormInfo("Usuário cadastrado com sucesso !!.", "success", true);

        setTimeout( () => {
            navigate("/login")
        },1000)
};

    return (
        <div className="form">
            <form onSubmit={handleSubmit} style={{ maxHeight: "800px" }}>
                <div className="form-header">
                    <img src="./imgs/auth-icon.png" alt="Auth Icon" />
                    <h1>Cadastre-se</h1>
                    {formMsgVisible && formMsg && (
                        <FormInfo 
                            msgType={formMsgType} 
                            formMsg={formMsg} 
                            isVisible={formMsgVisible} 
                            setVisible={setFormMsgVisible} 
                        />
                    )}
                </div>

                <div className="form-body">
                    <label htmlFor="name">
                        <span>Nome</span>
                        <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label htmlFor="taxNumber">
                        <span>CPF ou CNPJ do usuário</span>
                        <input
                            type="text"
                            name="taxNumber"
                            value={userData.taxNumber}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label htmlFor="mail">
                        <span>E-mail</span>
                        <input
                            type="email"
                            name="mail"
                            value={userData.mail}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label htmlFor="phone">
                        <span>Telefone</span>
                        <input
                            type="text"
                            name="phone"
                            value={userData.phone}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label htmlFor="password">
                        <span>Senha</span>
                        <input
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>

                <div className="form-footer">
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    );
};
