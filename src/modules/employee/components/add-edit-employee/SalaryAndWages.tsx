import { useTranslation } from "react-i18next";
import styles from "./SalaryAndWages.module.scss";
import { TitleAll } from "./TitleAll";
import { Col, Form, Input, Row, Typography } from "antd";
import { FieldData } from "@/types";
import { RULES_CREATE_EMPLOYEE } from "../../api/createEmployee";

const { Text } = Typography;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
    },
};

interface SalaryAndWagesProps{
    fields: FieldData[];
    setFields: any;
    form?: any;
}
interface CustomizedFormProps {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
    t?: any;
    form?: any;
}

export const SalaryAndWages: React.FC<SalaryAndWagesProps> = ({
    fields,
    setFields,
    form
}) => {
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <TitleAll title={t("features.employee.features_add_new.titleall.title4")}/>
            <CustomizedForm
                fields={fields}
                onChange={(newFields) => {
                    newFields.forEach((i: FieldData) => {
                        const index = fields.findIndex((f: FieldData) => f.name == i.name)
                        if(index !== -1){
                            fields[index].value = i.value;
                        }
                    })
                    setFields(fields);
                }}
                t={t}
                form={form}
            />
        </div>
    )
}

const configPrefix = () => {
    return <Text style={{color: "var(--text-color-blue)"}}>Rp</Text>
}

const CustomizedForm: React.FC<CustomizedFormProps> = ({ onChange, fields, t, form }) => (
    <Form
        name="Salaryandwages"
        form={form}
        {...formItemLayout}
        fields={fields}
        onFieldsChange={(_, allFields) => {
            onChange(allFields);
        }}
        className={styles.formmain}
        autoComplete="off"
    >
        <Row justify={'space-between'} wrap>
            <Col span={11} className={styles.row_fix}>
                <Form.Item
                    labelAlign={'left'}
                    name="basic_salary"
                    label={t("features.employee.features_add_new.salaryandwages.lable_input_basic_salary")}
                    rules={RULES_CREATE_EMPLOYEE.basic_salary}
                >
                    <Input type={'number'} step={1} prefix={configPrefix()} className="input_number"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="audit_salary"
                    label={t("features.employee.features_add_new.salaryandwages.lable_input_audit_salary")}
                    rules={RULES_CREATE_EMPLOYEE.audit_salary}
                >
                    <Input type={'number'} step={1} min={"100%"} prefix={configPrefix()} className="input_number"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="safety_insurance"
                    label={t("features.employee.features_add_new.salaryandwages.lable_input_safety_insurance")}
                    rules={RULES_CREATE_EMPLOYEE.safety_insurance}
                >
                    <Input type={'number'} step={1} prefix={configPrefix()} className="input_number"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="health_insurance"
                    label={t("features.employee.features_add_new.salaryandwages.lable_input_health_insurance")}
                    rules={RULES_CREATE_EMPLOYEE.health_insurance}
                >
                    <Input type={'number'} step={1} prefix={configPrefix()} className="input_number"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="meal_allowance"
                    label={t("features.employee.features_add_new.salaryandwages.lable_input_meal_allowance")}
                    rules={RULES_CREATE_EMPLOYEE.meal_allowance}
                >
                    <Input type={'number'} step={1} prefix={configPrefix()} className="input_number"/>
                </Form.Item>
            </Col>
        </Row>
    </Form>
);