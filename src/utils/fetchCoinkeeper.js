import { API_SERVER } from '../config/constant';

const month = new Date().getMonth();
const year = new Date().getFullYear();
const monthesArr = ['jan', 'feb', 'mar', 'apr', 'may', 'jun',
    'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

export const getStatistics = async (token) => {
    const response = await fetch(`${API_SERVER}coinkeeper/expense/statistics`, {
        method: "post",
        headers: {
            "Authorization": `${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ }),
    });
    const res = await response.json();
    try {
        const base = res.base.years[res.base.years.length - 1].month[monthesArr[month]];
        const lifestyle = res.lifestyle.years[res.lifestyle.years.length - 1].month[monthesArr[month]];
        const periodic = res.periodic.years[res.periodic.years.length - 1].month[monthesArr[month]];
        const big = res.big.years[res.big.years.length - 1].month[monthesArr[month]];
        const savings = res.savings.years[res.savings.years.length - 1].month[monthesArr[month]];
        return { base, lifestyle, periodic, big, savings };
    } catch (e) {
        return {
            base: 0,
            lifestyle: 0,
            periodic: 0,
            big: 0,
            savings: 0,
        };
    }
}

export const getBudget = async (token) => {
    const response = await fetch(`${API_SERVER}coinkeeper/settings/get_budget`, {
        method: "post",
        headers: {
            "Authorization": `${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ period: `${month + 1}/${year}` })
    });
    const res = await response.json();
    return res;
}

export const getTransactionsCount = async (token, start, end) => {
    const response = await fetch(`${API_SERVER}coinkeeper/expense/count`, {
        method: "post",
        headers: {
            "Authorization": `${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ start, end })
    });
    try {
        const { count } = await response.json();
        return  count;
    } catch (e) {
        return null;
    }
}

export const getIncome = async (token, start, end) => {
    const response = await fetch(`${API_SERVER}coinkeeper/income`, {
        method: "post",
        headers: {
            "Authorization": `${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ start, end })
    });
    const res = await response.json();
    return { ...res };
}

export const updateTransactions = (token) => {
    fetch(`${API_SERVER}coinkeeper/expense/statistics`, {
        method: "post",
        headers: {
            "Authorization": `${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ })
    })
    .then(response => response.json())
    .then(response => {
        try {
            if (response.ok) {
                return true;
            }
        } catch (e) {
            return false;
        }
        return false;
    });
}
