import os from "os";

const test = async (req, res) => {

    const serverInfo = {
        system: {
            platform: os.platform(),
            arch: os.arch(),
            cpuCount: os.cpus().length,
            cpus: os.cpus().map(cpu => cpu.model),
            totalMem: os.totalmem(),
            freeMem: os.freemem(),
            uptime: os.uptime(),
            hostname: os.hostname(),
        },
        request: {
            method: req.method,
            url: req.url,
            headers: req.headers,
            ip: req.ip,
            protocol: req.protocol,
            query: req.query,
        },
        response: {
            statusCode: res.statusCode,
            locals: res.locals,
        },
        page: {
            time: new Date().toISOString(),
            test_params: req.params.id
        },
    };
    res.render("test_index", { serverInfo });
}

export default test;