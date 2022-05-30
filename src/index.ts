import { opentelemetry as otel } from './opentelemetry-proto';

import * as crypto from "crypto";

function randomTraceId(): Uint8Array {
    return crypto.randomBytes(16)
}

function randomSpanId(): Uint8Array {
    return crypto.randomBytes(8);
}

try {

  const span = otel.proto.trace.v1.Span.create({
      traceId: randomTraceId(),
      spanId: randomSpanId(),
      startTimeUnixNano: Date.now() * 1000000,
      endTimeUnixNano: (Date.now() + 5000) * 1000000,
      kind: otel.proto.trace.v1.Span.SpanKind.SPAN_KIND_SERVER,
      status: {
          message: "ok",
          code: otel.proto.trace.v1.Status.StatusCode.STATUS_CODE_OK
      }
  });
  console.log(JSON.stringify(span, undefined, 2));

  const logRecord = otel.proto.logs.v1.LogRecord.create({
      traceId: randomTraceId(),
      spanId: randomSpanId(),
      timeUnixNano: Date.now() * 1000000,
      body: otel.proto.common.v1.AnyValue.create({
          stringValue: "log message contained in body"
      })
  });
  console.log(JSON.stringify(logRecord, undefined, 2));

} catch (error) {
  console.log(error.message);
}
