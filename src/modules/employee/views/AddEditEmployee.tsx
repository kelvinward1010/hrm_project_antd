import { Col, Row, Typography, Tabs } from "antd";
import styles from "./Employee.module.scss";
import { useTranslation } from "react-i18next";
import type { TabsProps } from 'antd';
import { useCallback, useEffect, useState } from "react";
import { ButtonConfigAntd, TextLicense } from "@/components";
import { 
    ContractInfomation, 
    EmployeeInfomation, 
    EmploymentDetails,
    Others,
    SalaryAndWages
} from "../components/add-edit-employee";
import { useRecoilState, useRecoilValue } from "recoil";
import { addEmployeeState, filledContractInfomation, filledEmployeeInfomation } from "../state/add-edit-employee/add.state";
import { InfoCircleOutlined } from "@ant-design/icons";
import { isAddEmplyee, isFilledContractInfomation, isFilledEmployeeInfomation, } from "../state/add-edit-employee/add.atom";
import { FieldData } from "../types";
import { useCreateEmployee } from "../api/createEmployee";
import { mapDataCreate, validateFieldsContractInfomation, validateFieldsEmployeeInfomation } from "@/utils/data";
import { Notification } from "@/components/notification/Notification";
import { useNavigate, useParams } from "react-router-dom";
import { employeeUrl } from "@/routes/urls";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import dayjs from "dayjs";
import { useEditEmployee } from "../api/editEmployee";

const { Text } = Typography;

export function AddEditEmployee() {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const idParams = useParams()?.id;
    const [activeTab, setActiveTab] = useState<string>("1");
    const [, setIsAddEmployee] = useRecoilState(isAddEmplyee);
    const isAddEmployee: boolean = useRecoilValue(addEmployeeState);
    const isEmployeeInfomation: boolean = useRecoilValue(filledEmployeeInfomation);
    const isContractInfomation: boolean = useRecoilValue(filledContractInfomation);
    const dataDetailEmployee: any = useSelector((state: RootState) => state.employee.employee);
    const [, setFilledInformationImportant] = useRecoilState(isFilledEmployeeInfomation);
    const [, setFilledContractImportant] = useRecoilState(isFilledContractInfomation);
    
    const [fields, setFields] = useState<FieldData[]>([
        {name: 'name', value: idParams ? dataDetailEmployee?.name : "" ,},
        {name: 'gender', value: idParams ? dataDetailEmployee?.gender : "",},
        {name: 'mother_name', value: idParams ? dataDetailEmployee?.mother_name : "",},
        {name: 'dob', value: idParams ? dayjs(dataDetailEmployee?.dob, 'YYYY-MM-DD') : "",},
        {name: 'pob', value: idParams ? dataDetailEmployee?.pob : "",},
        {name: 'ktp_no', value: idParams ? dataDetailEmployee?.ktp_no : "",},
        {name: 'nc_id', value: idParams ? dataDetailEmployee?.nc_id : "",},
        {name: 'home_address_1', value: idParams ? dataDetailEmployee?.home_address_1 : "",},
        {name: 'home_address_2', value: idParams ? dataDetailEmployee?.home_address_2 : "",},
        {name: 'mobile_no',value: idParams ? dataDetailEmployee?.mobile_no : "",},
        {name: 'tel_no',value: idParams ? dataDetailEmployee?.tel_no : "",},
        {name: 'marriage_id',value: idParams ? dataDetailEmployee?.marriage_id : "",},
        {name: 'card_number',value: idParams ? dataDetailEmployee?.card_number : "",},
        {name: 'bank_account_no',value: idParams ? dataDetailEmployee?.bank_account_no : "",},
        {name: 'bank_name',value: idParams ? dataDetailEmployee?.bank_name : "",},
        {name: 'family_card_number',value: idParams ? dataDetailEmployee?.family_card_number : "",},
        {name: 'safety_insurance_no',value: idParams ? dataDetailEmployee?.safety_insurance_no : "",},
        {name: 'health_insurance_no',value: idParams ? dataDetailEmployee?.health_insurance_no : "",},
        {name: 'contract_start_date', value: idParams ? dayjs(dataDetailEmployee?.contract_start_date, 'YYYY-MM-DD') : "",},
        {name: 'type', value: idParams ? dataDetailEmployee?.type : "",},
        {name: 'department_id', value: idParams ? dataDetailEmployee?.department_id : "",},
        {name: 'position_id', value: idParams ? dataDetailEmployee?.position_id : "",},
        {name: 'shift', value: idParams ? dataDetailEmployee?.shift : "",},
        {name: 'basic_salary', value: idParams ? dataDetailEmployee?.basic_salary : "",},
        {name: 'audit_salary', value: idParams ? dataDetailEmployee?.audit_salary : "",},
        {name: 'safety_insurance', value: idParams ? dataDetailEmployee?.safety_insurance : "",},
        {name: 'health_insurance', value: idParams ? dataDetailEmployee?.health_insurance : "",},
        {name: 'meal_allowance', value: idParams ? dataDetailEmployee?.meal_allowance : "",},
        {name: 'grade_id', value: idParams ? dataDetailEmployee?.grade_id : "",},
        {name: 'benefits', value: [],},
        {name: 'remark', value: idParams ? dataDetailEmployee?.remark : "",},
        {name: 'account_user_id', value: idParams ? dataDetailEmployee?.account_user_id : "",},
    ]);

    const [formCheck, setFormCheck] = useState<any>({
        hidden_on_payroll: idParams ? dataDetailEmployee?.hidden_on_payroll : 0,
        entitle_ot: idParams ? dataDetailEmployee?.entitle_ot : 0,
        meal_allowance_paid: idParams ? dataDetailEmployee?.meal_allowance_paid : 0,
        operational_allowance_paid: idParams ? dataDetailEmployee?.operational_allowance_paid : 0,
        attendance_allowance_paid: idParams ? dataDetailEmployee?.attendance_allowance_paid : 0,
    });

    const checkValueImportantEmployeeInfomation = validateFieldsEmployeeInfomation(fields);
    const checkValueImportantContractInfomation = validateFieldsContractInfomation(fields);
    
    const handleCreateEmployee = useCallback(() => {
        const data: any = mapDataCreate(fields);
        const finalData = {...data, ...formCheck};
        useCreateEmployee(finalData).then((res) => {
            if(res?.result === true) {
                Notification({
                    message: "Successfully created employee",
                    type: "success",
                })
            }
            navigate(employeeUrl);
        }).catch((err) => {
            Notification({
                message: err.data?.message,
                type: "error",
            })
        });
    },[fields])

    const handleEditEmployee = useCallback(() => {
        const data: any = mapDataCreate(fields);
        const finalData = {...data, ...formCheck};
        useEditEmployee(finalData, idParams as string).then((res) => {
            if(res?.result === true) {
                Notification({
                    message: "Successfully update employee",
                    type: "success",
                })
            }
            navigate(employeeUrl);
        }).catch((err) => {
            Notification({
                message: err.data?.message,
                type: "error",
            })
        });
    },[fields])
    
    const ConfigButtonTab = (label: string, key: string) => {
        return <ButtonConfigAntd
            label={label}
            background={activeTab === key ? "var(--button-color-dark-blue)" : "var(--button-color-light-blue)"}
            colorLabel={activeTab === key ? "white" : "var(--button-color-dark-blue)"}
            fontWeightLabel={500}
            fontSizeLabel={"14px"}
            height={45}
            border="none"
            padding="5px 30px"
            rightIcon={((!isEmployeeInfomation || !checkValueImportantEmployeeInfomation) && key == '1' || (!isContractInfomation || !checkValueImportantContractInfomation) && key == '2') ? <InfoCircleOutlined style={{color: "red", fontSize: "20px"}}/> : null}
        />
    }
    
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: ConfigButtonTab(t("features.employee.features_add_new.tabs.tab1"), "1"),
          children: <EmployeeInfomation fields={fields} setFields={setFields}/>,
        },
        {
          key: '2',
          label: ConfigButtonTab(t("features.employee.features_add_new.tabs.tab2"), "2"),
          children: <ContractInfomation fields={fields} setFields={setFields} />,
        },
        {
          key: '3',
          label: ConfigButtonTab(t("features.employee.features_add_new.tabs.tab3"), "3"),
          children: <EmploymentDetails fields={fields} setFields={setFields} formCheck={formCheck} setFormCheck={setFormCheck}/>,
        },
        {
            key: '4',
            label: ConfigButtonTab(t("features.employee.features_add_new.tabs.tab4"), "4"),
            children: <SalaryAndWages fields={fields} setFields={setFields}/>,
        },
        {
            key: '5',
            label: ConfigButtonTab(t("features.employee.features_add_new.tabs.tab5"), "5"),
            children: <Others fields={fields} setFields={setFields}/>,
        }
    ];

    const onChange = (key: string) => {
        setActiveTab(key);
    };

    useEffect(() => {
        (isContractInfomation && isEmployeeInfomation && checkValueImportantEmployeeInfomation && checkValueImportantContractInfomation) ? setIsAddEmployee(false) : setIsAddEmployee(true);
    },[isContractInfomation, isEmployeeInfomation, fields]);

    useEffect(() => {
        if(!idParams){
            setFilledContractImportant(false);
            setFilledInformationImportant(false);
        }else{
            setFilledContractImportant(true);
            setFilledInformationImportant(true);
        }
    },[dataDetailEmployee, idParams])

    return (
        <div className={styles.container}>
            <Row justify={'space-between'} align={'middle'}>
                <Col span={10}>
                    <Text className={styles.label_main}>{t("features.name")}</Text>
                </Col>
                <Col span={2}>
                    <ButtonConfigAntd
                        label={idParams ? t("features.employee.features_add_new.lable_save_change") : t("features.employee.features_add_new.lable_add")}
                        background={isAddEmployee ? "var(--button-color-dark-black)" : "var(--button-color-dark-blue)"}
                        colorLabel="white"
                        height={40}
                        with="auto"
                        border="none"
                        disabled={idParams ? false : isAddEmployee}
                        onClick={idParams ? handleEditEmployee : handleCreateEmployee}
                    />
                </Col>
            </Row>

            <div className={styles.tabs_main}>
                <Tabs
                    defaultActiveKey="1" 
                    items={items} 
                    onChange={onChange} 
                />
            </div>

            <TextLicense/>
        </div>
    )
}