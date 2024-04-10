import { TitleAll } from "./TitleAll";
import styles from "./EmployeeInfomation.module.scss";
import { useTranslation } from "react-i18next";
import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import { useState } from "react";
import { Notification } from "@/components/notification/Notification";
import { isFilledEmployeeInfomation } from "../../state/add_new_employee/add.atom";
import { useRecoilState } from "recoil";
import { GENDER_CONFIG } from "../../config";


const dateFormat = 'YYYY/MM/DD';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

interface FieldData {
    name: string | number | (string | number)[];
    value?: any;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
}

interface CustomizedFormProps {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
    onSubmit: (data: any) => void;
    onFailure: (data: any) => void;
    t?: any;
    setFilledInformationImportant?: any;
}

export function EmployeeInfomation() {
    const { t } = useTranslation();
    const [, setFilledInformationImportant] = useRecoilState(isFilledEmployeeInfomation);
    const [fields, setFields] = useState<FieldData[]>([
        {
            name: ['name'], value: "",
        },
        {
            name: ['gender'], value: "",
        },
        {
            name: ['mother_name'], value: "",
        },
        {
            name: ['dob'], value: "",
        },
        {
            name: ['pob'], value: "",
        },
        {
            name: ['ktp_no'], value: "",
        },
        {
            name: ['nc_id'], value: "",
        },
        {
            name: ['home_address_1'], value: "",
        },
        {
            name: ['home_address_2'], value: "",
        },
        {
            name: ['mobile_no'],value: "",
        },
        {
            name: ['tel_no'],value: "",
        },
        {
            name: ['marriage_id'],value: "",
        },
        {
            name: ['card_number'],value: "",
        },
        {
            name: ['bank_account_no'],value: "",
        },
        {
            name: ['bank_name'],value: "",
        },
        {
            name: ['family_card_number'],value: "",
        },
        {
            name: ['safety_insurance_no'],value: "",
        },
        {
            name: ['health_insurance_no'],value: "",
        },
    ]);

    const onFinish = (values: any) => {
        const data = {
            name: values.name,
            gender: values.gender,
        }
        Notification({
            message: "Created OK",
            type: "success",
        })
        console.log(data)
    }

    const onFinishFailed = (errorInfo: any) => {
        Notification({
            message: errorInfo,
            type: "error",
        })
    };

    return (
        <div className={styles.container}>
            <TitleAll title={t("features.employee.features_add_new.titleall.title1")}/>
            <CustomizedForm
                fields={fields}
                onChange={(newFields) => {
                    setFields(newFields);
                }}
                onFailure={(error: any) => onFinishFailed(error)}
                onSubmit={(values: any) => onFinish(values)}
                t={t}
                setFilledInformationImportant={setFilledInformationImportant}
            />
        </div>
    )
}


const CustomizedForm: React.FC<CustomizedFormProps> = ({ onChange, fields, onFailure, onSubmit, t, setFilledInformationImportant }) => (
    <Form
        name="employee_information"
        {...formItemLayout}
        fields={fields}
        onFieldsChange={(_, allFields) => {
            onChange(allFields);
            if(fields[0].value !== "" && fields[1].value !== "" && fields[3].value !== null && fields[5].value !== "" && fields[6].value !== ""){
                setFilledInformationImportant(true);
            }else{
                setFilledInformationImportant(false);
            }
        }}
        onFinish={onSubmit}
        onFinishFailed={onFailure}
        className={styles.formmain}
        autoComplete="off"
    >
        <Row justify={'space-between'} wrap>
            <Col span={11} className={styles.row_fix}>
                <Form.Item
                    labelAlign={'left'}
                    name="name"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_name")}
                    rules={[{required: true, message: 'Name is required!' }]}
                >
                    <Input className="input_inside"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="gender"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_gender")}
                    rules={[{required: true, message: 'Gender is required!' }]}
                >
                    <Select
                        options={GENDER_CONFIG}
                        placeholder="Choose Gender"
                        className="select_fix"
                    />
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="mother_name"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_mother_name")}
                >
                    <Input className="input_inside"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="dob"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_date_of_birth")}
                    rules={[{required: true, message: 'Date of birth is required!' }]}
                >
                    <DatePicker
                        format={dateFormat} 
                        placeholder="Select day of birth"
                        className={"date_picker"}
                        size={'large'}
                    />
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="pob"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_place_of_birth")}
                >
                    <Input className="input_inside"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="ktp_no"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_ktp_no")}
                    rules={[{required: true, message: 'KTP No is required!' }]}
                >
                    <Input className="input_inside"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="nc_id"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_national_card_id")}
                    rules={[{required: true, message: 'National Card ID is required!' }]}
                >
                    <Input className="input_inside"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="home_address_1"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_home_address_1")}
                >
                    <Input className="input_inside"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="home_address_2"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_home_address_2")}
                >
                    <Input className="input_inside"/>
                </Form.Item>
            </Col>
            <Col span={12} className={styles.row_fix}>
                <Form.Item
                    labelAlign={'left'}
                    name="mobile_no"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_mobile_no")}
                >
                    <Input className="input_inside"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="tel_no"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_tel_no")}
                >
                    <Input className="input_inside"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="marriage_id"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_marriage_status")}
                >
                    <Input className="input_inside"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="card_number"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_bank_card_no")}
                >
                    <Input className="input_inside"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="bank_account_no"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_bank_account_no")}
                >
                    <Input className="input_inside"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="bank_name"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_bank_name")}
                >
                    <Input className="input_inside"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="family_card_number"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_family_card_name")}
                >
                    <Input className="input_inside"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="safety_insurance_no"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_safety_insurance_no")}
                >
                    <Input className="input_inside"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="health_insurance_no"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_health_insurance_no")}
                >
                    <Input className="input_inside"/>
                </Form.Item>
            </Col>
        </Row>
    </Form>
);