fetch = require( 'node-fetch')
const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST,GET,HEAD'
};


const customerToken = '47df536d-abc2-4588-969c-c60cdc0b0035'
const loggerUrl = `https://logs-01.loggly.com/inputs/${customerToken}/tag/http/`

exports.handler = async (event, context) => {

    try {
        if ( event.httpMethod == 'OPTIONS' ) {
            return {
                statusCode: 204,
                headers
            }
        }
        ret = await fetch( loggerUrl, {
            method: event.httpMethod,
            body: event.body,
            headers
        })
        console.log( 'resp=', ret)
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(ret)
        }
    } catch(e) {
        console.log( 'ex=', e)
        return {
            statusCode: 400,
            body: "exception: "+e
        }
    }
/*
    await fetch('https://httpbin.org/post', {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => console.log(json));
    } catch (e) {
        return {
            statusCode: 200, headers, body: JSON.stringify({
                success: false,
                input: event,
                error: e.toString(),
                stack: e.stack.split('\n')
            })
        }
    }
    /*
    {
        "path": "Path parameter",
        "httpMethod": "Incoming request's method name"
        "headers": {Incoming request headers}
        "queryStringParameters": {query string parameters }
        "body": "A JSON string of the request payload."
        "isBase64Encoded": "A boolean flag to indicate if the applicable request payload is Base64-encode"
    }
    */
}
