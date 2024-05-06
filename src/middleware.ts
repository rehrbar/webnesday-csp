export async function onRequest({ locals, request }, next) {
    // intercept response data from a request
    // optionally, transform the response by modifying `locals`
    locals.title = "New title";

    // return a Response or the result of calling `next()`
    const resp = await next();
    console.log("resp", resp);
    //resp.headers.set("Content-Security-Policy","default-src 'self'; frame-src romanehrbar.ch; report-to my-reports; report-uri /csp")
    // Report-To is not supported in meta element.
    resp.headers.set("Report-to", JSON.stringify({
        "group": "my-reports",
        "max_age": 10886400,
        "endpoints": [
            { "url": "/csp2" }
        ]
    }));

    return resp;
};