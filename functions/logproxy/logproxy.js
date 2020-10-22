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
            headers,
            body: event.body
        })
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(ret)
        }
    } catch(e) {
        return {
            statusCode: 400,
            body: "exception: "+e
        }
    }
}
