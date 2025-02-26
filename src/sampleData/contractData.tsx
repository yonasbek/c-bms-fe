import Contract from "@/types/contract";

const sampleContractData: Contract[] = [
    {
        id: "1",
        startDate: new Date("2023-01-01"),
        endDate: new Date("2023-12-31"),
        status: "active",
        floorID: "F1",
        paymentID: "P1",
        paymentTerm: 12,
    },
    {
        id: "2",
        startDate: new Date("2023-02-01"),
        endDate: new Date("2023-11-30"),
        status: "active",
        floorID: "F2",
        paymentID: "P2",
        paymentTerm: 10,
    },
    {
        id: "3",
        startDate: new Date("2022-03-15"),
        endDate: new Date("2023-03-14"),
        status: "inactive",
        floorID: "F3",
        paymentID: "P3",
        paymentTerm: 12,
    },
    {
        id: "4",
        startDate: new Date("2023-04-01"),
        endDate: new Date("2025-04-01"),
        status: "active",
        floorID: "F4",
        paymentID: "P4",
        paymentTerm: 24,
    },
    {
        id: "5",
        startDate: new Date("2023-05-01"),
        endDate: new Date("2024-05-01"),
        status: "active",
        floorID: "F5",
        paymentID: "P5",
        paymentTerm: 12,
    }
];

export default sampleContractData;