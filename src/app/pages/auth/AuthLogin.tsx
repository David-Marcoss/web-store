import "./auth.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FormInfo } from "./components/FormInfo";
import { FormValidatios } from "./utils/FormValidations";
import { AuthService } from "../../shared/services/api/auth/AuthService";
import { UserLoggedContext } from "../../shared/contexts";

export const AuthLogin = () => {
    const [taxNumber, setTaxNumber] = useState("");
    const [password, setPassword] = useState("");
    const [formMsg, setFormMsg] = useState<string | null>(null);
    const [formMsgType, setFormMsgType] = useState<"success" | "fail">("success");
    const [formMsgVisible, setFormMsgVisible] = useState(false);

    const navigate = useNavigate();
    const userLogged = useContext(UserLoggedContext);

    useEffect(() => {
        if(userLogged.isAuthenticated){
            navigate("/")
        }
    })

    const setFormInfo = (formMsg:string,formMsgType:"success" | "fail",formMsgVisible:boolean) => {
        setFormMsg(formMsg);
        setFormMsgType(formMsgType);
        setFormMsgVisible(formMsgVisible);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!FormValidatios.validateTaxNumber(taxNumber)) {
            setFormInfo("Por favor, insira um CPF ou CNPJ válido.", "fail", true);
            return;
        }

        if (!FormValidatios.validatePassword(password)) {
            setFormInfo("A senha deve ter pelo menos 6 caracteres.", "fail", true);
            return;
        }

        const result = await AuthService.login({password,taxNumber})

        if(!result.success){
            setFormInfo(result.message, "fail", true);
            return
        }else{
            setFormInfo("Login efetuado com sucesso !!.", "success", true);

            console.log(result.data?.token)
            
            userLogged.setAuthCredentials(result.data?.token as string)
            
            // navigate("/")
        }

    };

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="form-header">
                    <img src="./imgs/auth-icon.png" alt="Auth Icon" />
                    <h1>Login</h1>

                    {formMsgVisible && formMsg && (
                        <FormInfo 
                            msgType={formMsgType} 
                            formMsg={formMsg} 
                            isVisible={formMsgVisible } 
                            setVisible={formMsgVisible => setFormMsgVisible(formMsgVisible)}/>
                    )}
                    
                </div>
                <div className="form-body">
                    <label htmlFor="taxNumber">
                        <span>CPF ou CNPJ do usuário</span>
                        <input
                            type="text"
                            id="taxNumber"
                            value={taxNumber}
                            onChange={e => setTaxNumber(e.target.value)}
                        />
                    </label>
                    <label htmlFor="password">
                        <span>Senha</span>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <div className="form-footer">
                    <button type="submit">Entrar</button>
                    <Link to="/register" className="button-register">
                        Cadastre-se
                    </Link>
                </div>
            </form>
        </div>
    );
};
