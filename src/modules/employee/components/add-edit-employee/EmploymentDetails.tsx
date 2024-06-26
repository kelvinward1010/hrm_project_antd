import { useTranslation } from "react-i18next";
import styles from "./EmploymentDetails.module.scss";
import { TitleAll } from "./TitleAll";
import { Checkbox, Col, Form, Row, Select } from "antd";
import { LableInput } from "./LableInput";
import { useDepartments } from "../../api/getDepartments";
import { configValuesSelect, extractValues } from "@/utils/data";
import { usePositions } from "../../api/getPositions";
import { FieldData, IBaseOption } from "@/types";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 9 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
    },
};

interface EmploymentDetailsProps{
    fields: FieldData[];
    setFields: any;
    form?: any;
}

interface CustomizedFormProps {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
    t?: any;
    configDepartment: IBaseOption[];
    configPosition: IBaseOption[];
    form?: any;
}

export const EmploymentDetails: React.FC<EmploymentDetailsProps> = ({
    fields,
    setFields,
    form
}) => {
    const { t } = useTranslation();

    const configDepartment = configValuesSelect(useDepartments({})?.data);
    const configPosition = configValuesSelect(usePositions({})?.data);

    return (
        <div className={styles.container}>
            <TitleAll title={t("features.employee.features_add_new.titleall.title3")} />
            <CustomizedForm
                fields={fields}
                onChange={(newFields) => {
                    newFields.forEach((i: FieldData) => {
                        const index = fields.findIndex((f: FieldData) => f.name == i.name);
                        if(index !== -1){
                            fields[index].value = i.value;
                        }
                    })
                    const dataForm = form?.getFieldsValue();
                    const { operational_allowance_paid, attendance_allowance_paid, ...rest } = dataForm; 
                    const keysToExtract = ["entitle_ot", "operational_allowance_paid", "attendance_allowance_paid"];
                    const extractedValues = extractValues(newFields, keysToExtract);
                    const checkOT: FieldData = extractedValues['entitle_ot'];
                    if(checkOT?.touched === true && checkOT?.value === true ){
                        form.setFieldsValue({ 
                            operational_allowance_paid: false, 
                            attendance_allowance_paid: false, 
                            ...rest
                        });
                    } 
                    if(checkOT.touched === true && checkOT.value === false){
                        form.setFieldsValue({ 
                            operational_allowance_paid: true, 
                            attendance_allowance_paid: true, 
                            ...rest
                        });
                    }
                    setFields(fields);
                }}
                t={t}
                form={form}
                configDepartment={configDepartment}
                configPosition={configPosition}
            />
        </div>
    )
}


const CustomizedForm: React.FC<CustomizedFormProps> = ({ onChange, fields, t, configDepartment, configPosition, form }) => (
    <Form
        name="employee_detail"
        form={form}
        {...formItemLayout}
        fields={fields}
        onFieldsChange={(_, allFields) => {
            onChange(allFields);
        }}
        className={styles.formmain}
        autoComplete="off"
    >
        <Row justify={'start'} wrap>
            <Col span={7} className={styles.row_fix}>
                <Form.Item
                    labelAlign={'left'}
                    name="department_id"
                    label={LableInput({label: t("features.employee.features_add_new.eploymentdetails.lable_input_department")})}
                >
                    <Select
                        options={configDepartment}
                        placeholder="Select department"
                        className="select_fix"
                    />
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="position_id"
                    label={LableInput({label: t("features.employee.features_add_new.eploymentdetails.lable_input_position")})}
                >
                    <Select
                        options={configPosition}
                        placeholder="Select position"
                        className="select_fix"
                    />
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="shift"
                    label={LableInput({label: t("features.employee.features_add_new.eploymentdetails.lable_input_shift")})}
                >
                    <Select
                        options={[
                            {
                                value: "1",
                                label: "1"
                            }
                        ]}
                        placeholder="Select shift"
                        className="select_fix"
                    />
                </Form.Item>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Form.Item 
                    name="hidden_on_payroll"
                    valuePropName="checked"
                >
                    <Checkbox name="hidden_on_payroll" className={styles.check}>
                        {t("features.employee.features_add_new.eploymentdetails.lable_input_hidden_on_payroll")}
                    </Checkbox>
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item 
                    name="entitle_ot"
                    valuePropName="checked"
                >
                    <Checkbox  name="entitle_ot" className={styles.check}>
                        {t("features.employee.features_add_new.eploymentdetails.lable_input_entitle_ot")}
                    </Checkbox>
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item 
                    name="meal_allowance_paid"
                    valuePropName="checked"
                >
                    <Checkbox name="meal_allowance_paid" className={styles.check}>
                        {t("features.employee.features_add_new.eploymentdetails.lable_input_meal_allowance_paid")}
                    </Checkbox>
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item 
                    name="operational_allowance_paid"
                    valuePropName="checked"
                >
                    <Checkbox disabled name="operational_allowance_paid" className={styles.check}>
                        {t("features.employee.features_add_new.eploymentdetails.lable_input_operational_allowance_paid")}
                    </Checkbox>
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item 
                    name="attendance_allowance_paid"
                    valuePropName="checked"
                >
                    <Checkbox disabled name="attendance_allowance_paid"  className={styles.check}>
                        {t("features.employee.features_add_new.eploymentdetails.lable_input_attendance_allowance_paid")}
                    </Checkbox>
                </Form.Item>
            </Col>
        </Row>
    </Form>
);