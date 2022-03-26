export const atob = (() => {
    if (typeof window !== "undefined" && typeof window.atob !== "undefined") {
        return window.atob;
    }

    return (str: string) => Buffer.from(str, "base64").toString("binary");
})();

export const btoa = (() => {
    if (typeof window !== "undefined" && typeof window.btoa !== "undefined") {
        return window.btoa;
    }

    return (str: string) => Buffer.from(str, "binary").toString("base64");
})();
