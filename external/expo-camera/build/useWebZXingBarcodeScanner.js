import { useWorker } from '@koale/useworker';
import * as React from 'react';
import { captureImageContext, captureImageData } from './WebCameraUtils';
import { BarcodeReader } from "dynamsoft-javascript-barcode";
import { useRef } from "react";
BarcodeReader.license = 'DLS2eyJoYW5kc2hha2VDb2RlIjoiMTAxNzM2MzA2LVRYbFhaV0pRY205cVgyUmljZyIsIm9yZ2FuaXphdGlvbklEIjoiMTAxNzM2MzA2IiwiY2hlY2tDb2RlIjo1MzUzNjc5MzF9';
BarcodeReader.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@9.6.10/dist/";
export const toLuminanceBuffer = (imageBuffer, width, height) => {
    const luminanceBuffer = new Uint8ClampedArray(width * height);
    for (let i = 0, j = 0, length = imageBuffer.length; i < length; i += 4, j++) {
        let luminance;
        const alpha = imageBuffer[i + 3];
        if (alpha === 0) {
            luminance = 0xff;
        }
        else {
            const r = imageBuffer[i];
            const g = imageBuffer[i + 1];
            const b = imageBuffer[i + 2];
            luminance = (306 * r + 601 * g + 117 * b) >> 10;
        }
        luminanceBuffer[j] = luminance;
    }
    return luminanceBuffer;
};
const barcodeWorkerMethod = (barCodeTypes, { data, width, height }) => {
    return new Promise((resolve, reject) => {
        try {
            const { BarcodeFormat, BinaryBitmap, DecodeHintType, HybridBinarizer, MultiFormatReader, RGBLuminanceSource, } = self.ZXing;
            const luminanceBuffer = toLuminanceBuffer(data, width, height);
            const luminanceSource = new RGBLuminanceSource(luminanceBuffer, width, height);
            const binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource));
            const hints = new Map();
            hints.set(DecodeHintType.POSSIBLE_FORMATS, [
                barCodeTypes.includes('aztec') && BarcodeFormat.AZTEC,
                barCodeTypes.includes('codabar') && BarcodeFormat.CODABAR,
                barCodeTypes.includes('code39') && BarcodeFormat.CODE_39,
                barCodeTypes.includes('code128') && BarcodeFormat.CODE_128,
                barCodeTypes.includes('datamatrix') && BarcodeFormat.DATAMATRIX,
                barCodeTypes.includes('ean8') && BarcodeFormat.EAN_8,
                barCodeTypes.includes('ean13') && BarcodeFormat.EAN_13,
                barCodeTypes.includes('interleaved2of5') && BarcodeFormat.ITF,
                barCodeTypes.includes('pdf417') && BarcodeFormat.PDF_417,
                barCodeTypes.includes('qr') && BarcodeFormat.QR_CODE,
                barCodeTypes.includes('upc_a') && BarcodeFormat.UPC_A,
                barCodeTypes.includes('upc_e') && BarcodeFormat.UPC_E,
                barCodeTypes.includes('rss14') && BarcodeFormat.RSS_14,
                barCodeTypes.includes('upc_e_e') && BarcodeFormat.UPC_EAN_EXTENSION,
                barCodeTypes.includes('maxicode') && BarcodeFormat.MAXICODE,
            ].filter((e) => e));
            const reader = new MultiFormatReader(hints);
            const result = reader.decode(binaryBitmap, hints);
            console.log(result);
            const type = result.getBarcodeFormat() === BarcodeFormat.AZTEC
                ? 'aztec'
                : result.getBarcodeFormat() === BarcodeFormat.CODABAR
                    ? 'codabar'
                    : result.getBarcodeFormat() === BarcodeFormat.CODE_39
                        ? 'code39'
                        : result.getBarcodeFormat() === BarcodeFormat.CODE_128
                            ? 'code128'
                            : result.getBarcodeFormat() === BarcodeFormat.DATAMATRIX
                                ? 'datamatrix'
                                : result.getBarcodeFormat() === BarcodeFormat.EAN_8
                                    ? 'ean8'
                                    : result.getBarcodeFormat() === BarcodeFormat.EAN_13
                                        ? 'ean13'
                                        : result.getBarcodeFormat() === BarcodeFormat.ITF
                                            ? 'interleaved2of5'
                                            : result.getBarcodeFormat() === BarcodeFormat.PDF_417
                                                ? 'pdf417'
                                                : result.getBarcodeFormat() === BarcodeFormat.QR_CODE
                                                    ? 'qr'
                                                    : result.getBarcodeFormat() === BarcodeFormat.UPC_A
                                                        ? 'upc_a'
                                                        : result.getBarcodeFormat() === BarcodeFormat.UPC_E
                                                            ? 'upc_e'
                                                            : `Unknown format (${result.getBarcodeFormat()})`;
            const nativeEvent = {
                type,
                data: result.getText(),
                cornerPoints: [],
                bounds: { origin: { x: 0, y: 0 }, size: { width: 0, height: 0 } },
            };
            resolve(nativeEvent);
        }
        catch (e) {
            if (e.constructor.name === 'NotFoundException') {
                return resolve(undefined);
            }
            else if (e.constructor.name === 'ChecksumException') {
                return resolve(undefined);
            }
            else if (e.constructor.name === 'FormatException') {
                return resolve(undefined);
            }
            console.error(e);
        }
    });
};
function useRemoteJavascriptBarcodeReader() {
    return useWorker(barcodeWorkerMethod, {
        remoteDependencies: ['https://cdn.jsdelivr.net/npm/@zxing/library@0.19.1/umd/index.js'],
        autoTerminate: false,
    });
}
export function useWebZXingBarcodeScanner(video, { barCodeTypes, isEnabled, captureOptions, interval, onScanned, onError, }) {
    const isRunning = React.useRef(false);
    const timeout = React.useRef(undefined);
    const scanner = useRef(null);
    const [decode, clearWorker] = useRemoteJavascriptBarcodeReader();
    async function scanAsync() {
        // If interval is 0 then only scan once.
        if (!isRunning.current || !onScanned) {
            stop();
            return;
        }
        try {
            const data = captureImageData(video.current, captureOptions);
            if (data) {
                const nativeEvent = await decode(barCodeTypes, data);
                if (nativeEvent?.data) {
                    onScanned({
                        nativeEvent,
                    });
                }
            }
            const d = captureImageContext(video.current, captureOptions);
            if (scanner.current && d?.height > 0 && d?.width > 0) {
                const res = await scanner.current?.decode(d);
                for (let result of res) {
                    const type = result.barcodeFormatString;
                    const nativeEvent = {
                        type,
                        data: result.barcodeText,
                        cornerPoints: result.localizationResult,
                        bounds: { origin: { x: 0, y: 0 }, size: { width: 0, height: 0 } },
                    };
                    console.log(nativeEvent);
                    onScanned({ nativeEvent });
                }
                if (!res.length) {
                    console.log(res);
                }
            }
        }
        catch (error) {
            if (onError) {
                onError({ nativeEvent: error });
            }
            console.log(error);
        }
        finally {
            // If interval is 0 then only scan once.
            if (interval === 0) {
                stop();
                return;
            }
            const intervalToUse = !interval || interval < 0 ? 16 : interval;
            // @ts-ignore: Type 'Timeout' is not assignable to type 'number'
            timeout.current = setTimeout(() => {
                scanAsync();
            }, intervalToUse);
        }
    }
    function stop() {
        isRunning.current = false;
        clearTimeout(timeout.current);
    }
    React.useEffect(() => {
        if (isEnabled) {
            isRunning.current = true;
            BarcodeReader.loadWasm().then(() => {
                BarcodeReader.createInstance().then(res => {
                    scanner.current = res;
                    console.log(res);
                });
            });
            scanAsync();
        }
        else {
            stop();
        }
    }, [isEnabled]);
    React.useEffect(() => {
        return () => {
            stop();
            clearWorker.kill();
        };
    }, []);
}
//# sourceMappingURL=useWebZXingBarcodeScanner.js.map
//# sourceMappingURL=useWebZXingBarcodeScanner.js.map