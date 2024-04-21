import { selector } from "recoil";
import { deleteIdsDocuments, isAddEmplyee, isEditEmplyee, isFilledContractInfomation, isFilledEmployeeInfomation } from "./add.atom";

export const addEmployeeState: any = selector({
    key: "addEmployeeState",
    get: ({ get }) => {
        const isAdd = get(isAddEmplyee);
        return isAdd;
    },
});

export const editEmployeeState: any = selector({
    key: "editEmployeeState",
    get: ({ get }) => {
        const isEdit = get(isEditEmplyee);
        return isEdit;
    },
});

export const filledEmployeeInfomation: any = selector({
    key: "filledEmployeeInfomation",
    get: ({ get }) => {
        const isFilledInfo = get(isFilledEmployeeInfomation);
        return isFilledInfo;
    },
});

export const filledContractInfomation: any = selector({
    key: "filledContractInfomation",
    get: ({ get }) => {
        const isFilledContractInfo = get(isFilledContractInfomation);
        return isFilledContractInfo;
    },
});


export const DataDeleteIdsDocuments: any = selector({
    key: "DataDeleteIdsDocuments",
    get: ({ get }) => {
        const data = get(deleteIdsDocuments);
        return data;
    },
});