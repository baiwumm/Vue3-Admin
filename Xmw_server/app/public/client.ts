// This file is auto-generated, don't edit it
/**
 *
 */
import Util, * as $Util from '@alicloud/tea-util';
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import EndpointUtil from '@alicloud/endpoint-util';
import * as $tea from '@alicloud/tea-typescript';

export class AnalyzeNvcRequest extends $tea.Model {
    sourceIp?: string;
    scoreJsonStr?: string;
    data?: string;
    static names(): { [key: string]: string } {
        return {
            sourceIp: 'SourceIp',
            scoreJsonStr: 'ScoreJsonStr',
            data: 'Data',
        };
    }

    static types(): { [key: string]: any } {
        return {
            sourceIp: 'string',
            scoreJsonStr: 'string',
            data: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class AnalyzeNvcResponseBody extends $tea.Model {
    requestId?: string;
    bizCode?: string;
    static names(): { [key: string]: string } {
        return {
            requestId: 'RequestId',
            bizCode: 'BizCode',
        };
    }

    static types(): { [key: string]: any } {
        return {
            requestId: 'string',
            bizCode: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class AnalyzeNvcResponse extends $tea.Model {
    headers: { [key: string]: string };
    body: AnalyzeNvcResponseBody;
    static names(): { [key: string]: string } {
        return {
            headers: 'headers',
            body: 'body',
        };
    }

    static types(): { [key: string]: any } {
        return {
            headers: { 'type': 'map', 'keyType': 'string', 'valueType': 'string' },
            body: AnalyzeNvcResponseBody,
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class AuthenticateSigRequest extends $tea.Model {
    sourceIp?: string;
    sessionId?: string;
    appKey?: string;
    sig?: string;
    token?: string;
    scene?: string;
    remoteIp?: string;
    static names(): { [key: string]: string } {
        return {
            sourceIp: 'SourceIp',
            sessionId: 'SessionId',
            appKey: 'AppKey',
            sig: 'Sig',
            token: 'Token',
            scene: 'Scene',
            remoteIp: 'RemoteIp',
        };
    }

    static types(): { [key: string]: any } {
        return {
            sourceIp: 'string',
            sessionId: 'string',
            appKey: 'string',
            sig: 'string',
            token: 'string',
            scene: 'string',
            remoteIp: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class AuthenticateSigResponseBody extends $tea.Model {
    msg?: string;
    requestId?: string;
    riskLevel?: string;
    code?: number;
    detail?: string;
    static names(): { [key: string]: string } {
        return {
            msg: 'Msg',
            requestId: 'RequestId',
            riskLevel: 'RiskLevel',
            code: 'Code',
            detail: 'Detail',
        };
    }

    static types(): { [key: string]: any } {
        return {
            msg: 'string',
            requestId: 'string',
            riskLevel: 'string',
            code: 'number',
            detail: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class AuthenticateSigResponse extends $tea.Model {
    headers: { [key: string]: string };
    body: AuthenticateSigResponseBody;
    static names(): { [key: string]: string } {
        return {
            headers: 'headers',
            body: 'body',
        };
    }

    static types(): { [key: string]: any } {
        return {
            headers: { 'type': 'map', 'keyType': 'string', 'valueType': 'string' },
            body: AuthenticateSigResponseBody,
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class ConfigurationStyleRequest extends $tea.Model {
    sourceIp?: string;
    applyType?: string;
    scene?: string;
    configurationMethod?: string;
    refExtId?: string;
    static names(): { [key: string]: string } {
        return {
            sourceIp: 'SourceIp',
            applyType: 'ApplyType',
            scene: 'Scene',
            configurationMethod: 'ConfigurationMethod',
            refExtId: 'RefExtId',
        };
    }

    static types(): { [key: string]: any } {
        return {
            sourceIp: 'string',
            applyType: 'string',
            scene: 'string',
            configurationMethod: 'string',
            refExtId: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class ConfigurationStyleResponseBody extends $tea.Model {
    codeData?: ConfigurationStyleResponseBodyCodeData;
    requestId?: string;
    bizCode?: string;
    static names(): { [key: string]: string } {
        return {
            codeData: 'CodeData',
            requestId: 'RequestId',
            bizCode: 'BizCode',
        };
    }

    static types(): { [key: string]: any } {
        return {
            codeData: ConfigurationStyleResponseBodyCodeData,
            requestId: 'string',
            bizCode: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class ConfigurationStyleResponse extends $tea.Model {
    headers: { [key: string]: string };
    body: ConfigurationStyleResponseBody;
    static names(): { [key: string]: string } {
        return {
            headers: 'headers',
            body: 'body',
        };
    }

    static types(): { [key: string]: any } {
        return {
            headers: { 'type': 'map', 'keyType': 'string', 'valueType': 'string' },
            body: ConfigurationStyleResponseBody,
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class CreateConfigurationRequest extends $tea.Model {
    sourceIp?: string;
    configurationName?: string;
    applyType?: string;
    scene?: string;
    maxPV?: string;
    configurationMethod?: string;
    static names(): { [key: string]: string } {
        return {
            sourceIp: 'SourceIp',
            configurationName: 'ConfigurationName',
            applyType: 'ApplyType',
            scene: 'Scene',
            maxPV: 'MaxPV',
            configurationMethod: 'ConfigurationMethod',
        };
    }

    static types(): { [key: string]: any } {
        return {
            sourceIp: 'string',
            configurationName: 'string',
            applyType: 'string',
            scene: 'string',
            maxPV: 'string',
            configurationMethod: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class CreateConfigurationResponseBody extends $tea.Model {
    refExtId?: string;
    requestId?: string;
    bizCode?: string;
    static names(): { [key: string]: string } {
        return {
            refExtId: 'RefExtId',
            requestId: 'RequestId',
            bizCode: 'BizCode',
        };
    }

    static types(): { [key: string]: any } {
        return {
            refExtId: 'string',
            requestId: 'string',
            bizCode: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class CreateConfigurationResponse extends $tea.Model {
    headers: { [key: string]: string };
    body: CreateConfigurationResponseBody;
    static names(): { [key: string]: string } {
        return {
            headers: 'headers',
            body: 'body',
        };
    }

    static types(): { [key: string]: any } {
        return {
            headers: { 'type': 'map', 'keyType': 'string', 'valueType': 'string' },
            body: CreateConfigurationResponseBody,
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsConfigNameRequest extends $tea.Model {
    sourceIp?: string;
    productName?: string;
    static names(): { [key: string]: string } {
        return {
            sourceIp: 'SourceIp',
            productName: 'ProductName',
        };
    }

    static types(): { [key: string]: any } {
        return {
            sourceIp: 'string',
            productName: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsConfigNameResponseBody extends $tea.Model {
    requestId?: string;
    configNames?: DescribeAfsConfigNameResponseBodyConfigNames[];
    bizCode?: string;
    hasData?: boolean;
    static names(): { [key: string]: string } {
        return {
            requestId: 'RequestId',
            configNames: 'ConfigNames',
            bizCode: 'BizCode',
            hasData: 'HasData',
        };
    }

    static types(): { [key: string]: any } {
        return {
            requestId: 'string',
            configNames: { 'type': 'array', 'itemType': DescribeAfsConfigNameResponseBodyConfigNames },
            bizCode: 'string',
            hasData: 'boolean',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsConfigNameResponse extends $tea.Model {
    headers: { [key: string]: string };
    body: DescribeAfsConfigNameResponseBody;
    static names(): { [key: string]: string } {
        return {
            headers: 'headers',
            body: 'body',
        };
    }

    static types(): { [key: string]: any } {
        return {
            headers: { 'type': 'map', 'keyType': 'string', 'valueType': 'string' },
            body: DescribeAfsConfigNameResponseBody,
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsOneConfDataRequest extends $tea.Model {
    sourceIp?: string;
    appKey?: string;
    scene?: string;
    productName?: string;
    static names(): { [key: string]: string } {
        return {
            sourceIp: 'SourceIp',
            appKey: 'AppKey',
            scene: 'Scene',
            productName: 'ProductName',
        };
    }

    static types(): { [key: string]: any } {
        return {
            sourceIp: 'string',
            appKey: 'string',
            scene: 'string',
            productName: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsOneConfDataResponseBody extends $tea.Model {
    requestId?: string;
    icOneConfDatas?: DescribeAfsOneConfDataResponseBodyIcOneConfDatas[];
    ncOneConfDatas?: DescribeAfsOneConfDataResponseBodyNcOneConfDatas[];
    nvcOneConfDatas?: DescribeAfsOneConfDataResponseBodyNvcOneConfDatas[];
    bizCode?: string;
    hasData?: boolean;
    static names(): { [key: string]: string } {
        return {
            requestId: 'RequestId',
            icOneConfDatas: 'IcOneConfDatas',
            ncOneConfDatas: 'NcOneConfDatas',
            nvcOneConfDatas: 'NvcOneConfDatas',
            bizCode: 'BizCode',
            hasData: 'HasData',
        };
    }

    static types(): { [key: string]: any } {
        return {
            requestId: 'string',
            icOneConfDatas: { 'type': 'array', 'itemType': DescribeAfsOneConfDataResponseBodyIcOneConfDatas },
            ncOneConfDatas: { 'type': 'array', 'itemType': DescribeAfsOneConfDataResponseBodyNcOneConfDatas },
            nvcOneConfDatas: { 'type': 'array', 'itemType': DescribeAfsOneConfDataResponseBodyNvcOneConfDatas },
            bizCode: 'string',
            hasData: 'boolean',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsOneConfDataResponse extends $tea.Model {
    headers: { [key: string]: string };
    body: DescribeAfsOneConfDataResponseBody;
    static names(): { [key: string]: string } {
        return {
            headers: 'headers',
            body: 'body',
        };
    }

    static types(): { [key: string]: any } {
        return {
            headers: { 'type': 'map', 'keyType': 'string', 'valueType': 'string' },
            body: DescribeAfsOneConfDataResponseBody,
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsTotalConfDataRequest extends $tea.Model {
    sourceIp?: string;
    productName?: string;
    static names(): { [key: string]: string } {
        return {
            sourceIp: 'SourceIp',
            productName: 'ProductName',
        };
    }

    static types(): { [key: string]: any } {
        return {
            sourceIp: 'string',
            productName: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsTotalConfDataResponseBody extends $tea.Model {
    requestId?: string;
    icTotalConfSigDatas?: DescribeAfsTotalConfDataResponseBodyIcTotalConfSigDatas[];
    nvcTotalConfSecVerifyDatas?: DescribeAfsTotalConfDataResponseBodyNvcTotalConfSecVerifyDatas[];
    icTotalConfVerifyDatas?: DescribeAfsTotalConfDataResponseBodyIcTotalConfVerifyDatas[];
    nvcTotalConfVerifyDatas?: DescribeAfsTotalConfDataResponseBodyNvcTotalConfVerifyDatas[];
    icTotalConfSecVerifyDatas?: DescribeAfsTotalConfDataResponseBodyIcTotalConfSecVerifyDatas[];
    ncTotalConfBlockDatas?: DescribeAfsTotalConfDataResponseBodyNcTotalConfBlockDatas[];
    icTotalConfBlockDatas?: DescribeAfsTotalConfDataResponseBodyIcTotalConfBlockDatas[];
    ncTotalConfSigDatas?: DescribeAfsTotalConfDataResponseBodyNcTotalConfSigDatas[];
    bizCode?: string;
    hasData?: boolean;
    ncTotalConfVerifyDatas?: DescribeAfsTotalConfDataResponseBodyNcTotalConfVerifyDatas[];
    static names(): { [key: string]: string } {
        return {
            requestId: 'RequestId',
            icTotalConfSigDatas: 'IcTotalConfSigDatas',
            nvcTotalConfSecVerifyDatas: 'NvcTotalConfSecVerifyDatas',
            icTotalConfVerifyDatas: 'IcTotalConfVerifyDatas',
            nvcTotalConfVerifyDatas: 'NvcTotalConfVerifyDatas',
            icTotalConfSecVerifyDatas: 'IcTotalConfSecVerifyDatas',
            ncTotalConfBlockDatas: 'NcTotalConfBlockDatas',
            icTotalConfBlockDatas: 'IcTotalConfBlockDatas',
            ncTotalConfSigDatas: 'NcTotalConfSigDatas',
            bizCode: 'BizCode',
            hasData: 'HasData',
            ncTotalConfVerifyDatas: 'NcTotalConfVerifyDatas',
        };
    }

    static types(): { [key: string]: any } {
        return {
            requestId: 'string',
            icTotalConfSigDatas: { 'type': 'array', 'itemType': DescribeAfsTotalConfDataResponseBodyIcTotalConfSigDatas },
            nvcTotalConfSecVerifyDatas: { 'type': 'array', 'itemType': DescribeAfsTotalConfDataResponseBodyNvcTotalConfSecVerifyDatas },
            icTotalConfVerifyDatas: { 'type': 'array', 'itemType': DescribeAfsTotalConfDataResponseBodyIcTotalConfVerifyDatas },
            nvcTotalConfVerifyDatas: { 'type': 'array', 'itemType': DescribeAfsTotalConfDataResponseBodyNvcTotalConfVerifyDatas },
            icTotalConfSecVerifyDatas: { 'type': 'array', 'itemType': DescribeAfsTotalConfDataResponseBodyIcTotalConfSecVerifyDatas },
            ncTotalConfBlockDatas: { 'type': 'array', 'itemType': DescribeAfsTotalConfDataResponseBodyNcTotalConfBlockDatas },
            icTotalConfBlockDatas: { 'type': 'array', 'itemType': DescribeAfsTotalConfDataResponseBodyIcTotalConfBlockDatas },
            ncTotalConfSigDatas: { 'type': 'array', 'itemType': DescribeAfsTotalConfDataResponseBodyNcTotalConfSigDatas },
            bizCode: 'string',
            hasData: 'boolean',
            ncTotalConfVerifyDatas: { 'type': 'array', 'itemType': DescribeAfsTotalConfDataResponseBodyNcTotalConfVerifyDatas },
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsTotalConfDataResponse extends $tea.Model {
    headers: { [key: string]: string };
    body: DescribeAfsTotalConfDataResponseBody;
    static names(): { [key: string]: string } {
        return {
            headers: 'headers',
            body: 'body',
        };
    }

    static types(): { [key: string]: any } {
        return {
            headers: { 'type': 'map', 'keyType': 'string', 'valueType': 'string' },
            body: DescribeAfsTotalConfDataResponseBody,
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsVerifySigDataRequest extends $tea.Model {
    sourceIp?: string;
    appKey?: string;
    scene?: string;
    productName?: string;
    static names(): { [key: string]: string } {
        return {
            sourceIp: 'SourceIp',
            appKey: 'AppKey',
            scene: 'Scene',
            productName: 'ProductName',
        };
    }

    static types(): { [key: string]: any } {
        return {
            sourceIp: 'string',
            appKey: 'string',
            scene: 'string',
            productName: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsVerifySigDataResponseBody extends $tea.Model {
    nvcCodeDatas?: DescribeAfsVerifySigDataResponseBodyNvcCodeDatas[];
    nvcSecDatas?: DescribeAfsVerifySigDataResponseBodyNvcSecDatas[];
    icVerifyDatas?: DescribeAfsVerifySigDataResponseBodyIcVerifyDatas[];
    requestId?: string;
    ncVerifyDatas?: DescribeAfsVerifySigDataResponseBodyNcVerifyDatas[];
    nvcVerifyDatas?: DescribeAfsVerifySigDataResponseBodyNvcVerifyDatas[];
    icSecVerifyDatas?: DescribeAfsVerifySigDataResponseBodyIcSecVerifyDatas[];
    ncSigDatas?: DescribeAfsVerifySigDataResponseBodyNcSigDatas[];
    bizCode?: string;
    hasData?: boolean;
    static names(): { [key: string]: string } {
        return {
            nvcCodeDatas: 'NvcCodeDatas',
            nvcSecDatas: 'NvcSecDatas',
            icVerifyDatas: 'IcVerifyDatas',
            requestId: 'RequestId',
            ncVerifyDatas: 'NcVerifyDatas',
            nvcVerifyDatas: 'NvcVerifyDatas',
            icSecVerifyDatas: 'IcSecVerifyDatas',
            ncSigDatas: 'NcSigDatas',
            bizCode: 'BizCode',
            hasData: 'HasData',
        };
    }

    static types(): { [key: string]: any } {
        return {
            nvcCodeDatas: { 'type': 'array', 'itemType': DescribeAfsVerifySigDataResponseBodyNvcCodeDatas },
            nvcSecDatas: { 'type': 'array', 'itemType': DescribeAfsVerifySigDataResponseBodyNvcSecDatas },
            icVerifyDatas: { 'type': 'array', 'itemType': DescribeAfsVerifySigDataResponseBodyIcVerifyDatas },
            requestId: 'string',
            ncVerifyDatas: { 'type': 'array', 'itemType': DescribeAfsVerifySigDataResponseBodyNcVerifyDatas },
            nvcVerifyDatas: { 'type': 'array', 'itemType': DescribeAfsVerifySigDataResponseBodyNvcVerifyDatas },
            icSecVerifyDatas: { 'type': 'array', 'itemType': DescribeAfsVerifySigDataResponseBodyIcSecVerifyDatas },
            ncSigDatas: { 'type': 'array', 'itemType': DescribeAfsVerifySigDataResponseBodyNcSigDatas },
            bizCode: 'string',
            hasData: 'boolean',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsVerifySigDataResponse extends $tea.Model {
    headers: { [key: string]: string };
    body: DescribeAfsVerifySigDataResponseBody;
    static names(): { [key: string]: string } {
        return {
            headers: 'headers',
            body: 'body',
        };
    }

    static types(): { [key: string]: any } {
        return {
            headers: { 'type': 'map', 'keyType': 'string', 'valueType': 'string' },
            body: DescribeAfsVerifySigDataResponseBody,
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeCaptchaDayRequest extends $tea.Model {
    sourceIp?: string;
    configName?: string;
    type?: string;
    time?: string;
    refExtId?: string;
    static names(): { [key: string]: string } {
        return {
            sourceIp: 'SourceIp',
            configName: 'ConfigName',
            type: 'Type',
            time: 'Time',
            refExtId: 'RefExtId',
        };
    }

    static types(): { [key: string]: any } {
        return {
            sourceIp: 'string',
            configName: 'string',
            type: 'string',
            time: 'string',
            refExtId: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeCaptchaDayResponseBody extends $tea.Model {
    captchaDay?: DescribeCaptchaDayResponseBodyCaptchaDay;
    requestId?: string;
    bizCode?: string;
    hasData?: boolean;
    static names(): { [key: string]: string } {
        return {
            captchaDay: 'CaptchaDay',
            requestId: 'RequestId',
            bizCode: 'BizCode',
            hasData: 'HasData',
        };
    }

    static types(): { [key: string]: any } {
        return {
            captchaDay: DescribeCaptchaDayResponseBodyCaptchaDay,
            requestId: 'string',
            bizCode: 'string',
            hasData: 'boolean',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeCaptchaDayResponse extends $tea.Model {
    headers: { [key: string]: string };
    body: DescribeCaptchaDayResponseBody;
    static names(): { [key: string]: string } {
        return {
            headers: 'headers',
            body: 'body',
        };
    }

    static types(): { [key: string]: any } {
        return {
            headers: { 'type': 'map', 'keyType': 'string', 'valueType': 'string' },
            body: DescribeCaptchaDayResponseBody,
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeCaptchaIpCityRequest extends $tea.Model {
    sourceIp?: string;
    configName?: string;
    type?: string;
    time?: string;
    refExtId?: string;
    static names(): { [key: string]: string } {
        return {
            sourceIp: 'SourceIp',
            configName: 'ConfigName',
            type: 'Type',
            time: 'Time',
            refExtId: 'RefExtId',
        };
    }

    static types(): { [key: string]: any } {
        return {
            sourceIp: 'string',
            configName: 'string',
            type: 'string',
            time: 'string',
            refExtId: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeCaptchaIpCityResponseBody extends $tea.Model {
    captchaIps?: DescribeCaptchaIpCityResponseBodyCaptchaIps[];
    captchaCities?: DescribeCaptchaIpCityResponseBodyCaptchaCities[];
    requestId?: string;
    bizCode?: string;
    hasData?: boolean;
    static names(): { [key: string]: string } {
        return {
            captchaIps: 'CaptchaIps',
            captchaCities: 'CaptchaCities',
            requestId: 'RequestId',
            bizCode: 'BizCode',
            hasData: 'HasData',
        };
    }

    static types(): { [key: string]: any } {
        return {
            captchaIps: { 'type': 'array', 'itemType': DescribeCaptchaIpCityResponseBodyCaptchaIps },
            captchaCities: { 'type': 'array', 'itemType': DescribeCaptchaIpCityResponseBodyCaptchaCities },
            requestId: 'string',
            bizCode: 'string',
            hasData: 'boolean',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeCaptchaIpCityResponse extends $tea.Model {
    headers: { [key: string]: string };
    body: DescribeCaptchaIpCityResponseBody;
    static names(): { [key: string]: string } {
        return {
            headers: 'headers',
            body: 'body',
        };
    }

    static types(): { [key: string]: any } {
        return {
            headers: { 'type': 'map', 'keyType': 'string', 'valueType': 'string' },
            body: DescribeCaptchaIpCityResponseBody,
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeCaptchaMinRequest extends $tea.Model {
    sourceIp?: string;
    configName?: string;
    type?: string;
    time?: string;
    refExtId?: string;
    static names(): { [key: string]: string } {
        return {
            sourceIp: 'SourceIp',
            configName: 'ConfigName',
            type: 'Type',
            time: 'Time',
            refExtId: 'RefExtId',
        };
    }

    static types(): { [key: string]: any } {
        return {
            sourceIp: 'string',
            configName: 'string',
            type: 'string',
            time: 'string',
            refExtId: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeCaptchaMinResponseBody extends $tea.Model {
    requestId?: string;
    captchaMins?: DescribeCaptchaMinResponseBodyCaptchaMins[];
    bizCode?: string;
    hasData?: boolean;
    static names(): { [key: string]: string } {
        return {
            requestId: 'RequestId',
            captchaMins: 'CaptchaMins',
            bizCode: 'BizCode',
            hasData: 'HasData',
        };
    }

    static types(): { [key: string]: any } {
        return {
            requestId: 'string',
            captchaMins: { 'type': 'array', 'itemType': DescribeCaptchaMinResponseBodyCaptchaMins },
            bizCode: 'string',
            hasData: 'boolean',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeCaptchaMinResponse extends $tea.Model {
    headers: { [key: string]: string };
    body: DescribeCaptchaMinResponseBody;
    static names(): { [key: string]: string } {
        return {
            headers: 'headers',
            body: 'body',
        };
    }

    static types(): { [key: string]: any } {
        return {
            headers: { 'type': 'map', 'keyType': 'string', 'valueType': 'string' },
            body: DescribeCaptchaMinResponseBody,
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeCaptchaOrderRequest extends $tea.Model {
    sourceIp?: string;
    lang?: string;
    static names(): { [key: string]: string } {
        return {
            sourceIp: 'SourceIp',
            lang: 'Lang',
        };
    }

    static types(): { [key: string]: any } {
        return {
            sourceIp: 'string',
            lang: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeCaptchaOrderResponseBody extends $tea.Model {
    requestId?: string;
    bizCode?: string;
    static names(): { [key: string]: string } {
        return {
            requestId: 'RequestId',
            bizCode: 'BizCode',
        };
    }

    static types(): { [key: string]: any } {
        return {
            requestId: 'string',
            bizCode: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeCaptchaOrderResponse extends $tea.Model {
    headers: { [key: string]: string };
    body: DescribeCaptchaOrderResponseBody;
    static names(): { [key: string]: string } {
        return {
            headers: 'headers',
            body: 'body',
        };
    }

    static types(): { [key: string]: any } {
        return {
            headers: { 'type': 'map', 'keyType': 'string', 'valueType': 'string' },
            body: DescribeCaptchaOrderResponseBody,
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeCaptchaRiskRequest extends $tea.Model {
    sourceIp?: string;
    configName?: string;
    time?: string;
    refExtId?: string;
    static names(): { [key: string]: string } {
        return {
            sourceIp: 'SourceIp',
            configName: 'ConfigName',
            time: 'Time',
            refExtId: 'RefExtId',
        };
    }

    static types(): { [key: string]: any } {
        return {
            sourceIp: 'string',
            configName: 'string',
            time: 'string',
            refExtId: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeCaptchaRiskResponseBody extends $tea.Model {
    requestId?: string;
    numOfLastMonth?: number;
    riskLevel?: string;
    numOfThisMonth?: number;
    bizCode?: string;
    static names(): { [key: string]: string } {
        return {
            requestId: 'RequestId',
            numOfLastMonth: 'NumOfLastMonth',
            riskLevel: 'RiskLevel',
            numOfThisMonth: 'NumOfThisMonth',
            bizCode: 'BizCode',
        };
    }

    static types(): { [key: string]: any } {
        return {
            requestId: 'string',
            numOfLastMonth: 'number',
            riskLevel: 'string',
            numOfThisMonth: 'number',
            bizCode: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeCaptchaRiskResponse extends $tea.Model {
    headers: { [key: string]: string };
    body: DescribeCaptchaRiskResponseBody;
    static names(): { [key: string]: string } {
        return {
            headers: 'headers',
            body: 'body',
        };
    }

    static types(): { [key: string]: any } {
        return {
            headers: { 'type': 'map', 'keyType': 'string', 'valueType': 'string' },
            body: DescribeCaptchaRiskResponseBody,
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeConfigNameRequest extends $tea.Model {
    sourceIp?: string;
    static names(): { [key: string]: string } {
        return {
            sourceIp: 'SourceIp',
        };
    }

    static types(): { [key: string]: any } {
        return {
            sourceIp: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeConfigNameResponseBody extends $tea.Model {
    requestId?: string;
    configNames?: DescribeConfigNameResponseBodyConfigNames[];
    hasConfig?: boolean;
    bizCode?: string;
    static names(): { [key: string]: string } {
        return {
            requestId: 'RequestId',
            configNames: 'ConfigNames',
            hasConfig: 'HasConfig',
            bizCode: 'BizCode',
        };
    }

    static types(): { [key: string]: any } {
        return {
            requestId: 'string',
            configNames: { 'type': 'array', 'itemType': DescribeConfigNameResponseBodyConfigNames },
            hasConfig: 'boolean',
            bizCode: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeConfigNameResponse extends $tea.Model {
    headers: { [key: string]: string };
    body: DescribeConfigNameResponseBody;
    static names(): { [key: string]: string } {
        return {
            headers: 'headers',
            body: 'body',
        };
    }

    static types(): { [key: string]: any } {
        return {
            headers: { 'type': 'map', 'keyType': 'string', 'valueType': 'string' },
            body: DescribeConfigNameResponseBody,
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeEarlyWarningRequest extends $tea.Model {
    sourceIp?: string;
    static names(): { [key: string]: string } {
        return {
            sourceIp: 'SourceIp',
        };
    }

    static types(): { [key: string]: any } {
        return {
            sourceIp: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeEarlyWarningResponseBody extends $tea.Model {
    requestId?: string;
    hasWarning?: boolean;
    earlyWarnings?: DescribeEarlyWarningResponseBodyEarlyWarnings[];
    bizCode?: string;
    static names(): { [key: string]: string } {
        return {
            requestId: 'RequestId',
            hasWarning: 'HasWarning',
            earlyWarnings: 'EarlyWarnings',
            bizCode: 'BizCode',
        };
    }

    static types(): { [key: string]: any } {
        return {
            requestId: 'string',
            hasWarning: 'boolean',
            earlyWarnings: { 'type': 'array', 'itemType': DescribeEarlyWarningResponseBodyEarlyWarnings },
            bizCode: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeEarlyWarningResponse extends $tea.Model {
    headers: { [key: string]: string };
    body: DescribeEarlyWarningResponseBody;
    static names(): { [key: string]: string } {
        return {
            headers: 'headers',
            body: 'body',
        };
    }

    static types(): { [key: string]: any } {
        return {
            headers: { 'type': 'map', 'keyType': 'string', 'valueType': 'string' },
            body: DescribeEarlyWarningResponseBody,
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeOrderInfoRequest extends $tea.Model {
    sourceIp?: string;
    static names(): { [key: string]: string } {
        return {
            sourceIp: 'SourceIp',
        };
    }

    static types(): { [key: string]: any } {
        return {
            sourceIp: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeOrderInfoResponseBody extends $tea.Model {
    orderLevel?: string;
    requestId?: string;
    num?: string;
    endDate?: string;
    bizCode?: string;
    beginDate?: string;
    static names(): { [key: string]: string } {
        return {
            orderLevel: 'OrderLevel',
            requestId: 'RequestId',
            num: 'Num',
            endDate: 'EndDate',
            bizCode: 'BizCode',
            beginDate: 'BeginDate',
        };
    }

    static types(): { [key: string]: any } {
        return {
            orderLevel: 'string',
            requestId: 'string',
            num: 'string',
            endDate: 'string',
            bizCode: 'string',
            beginDate: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeOrderInfoResponse extends $tea.Model {
    headers: { [key: string]: string };
    body: DescribeOrderInfoResponseBody;
    static names(): { [key: string]: string } {
        return {
            headers: 'headers',
            body: 'body',
        };
    }

    static types(): { [key: string]: any } {
        return {
            headers: { 'type': 'map', 'keyType': 'string', 'valueType': 'string' },
            body: DescribeOrderInfoResponseBody,
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribePersonMachineListRequest extends $tea.Model {
    sourceIp?: string;
    static names(): { [key: string]: string } {
        return {
            sourceIp: 'SourceIp',
        };
    }

    static types(): { [key: string]: any } {
        return {
            sourceIp: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribePersonMachineListResponseBody extends $tea.Model {
    personMachineRes?: DescribePersonMachineListResponseBodyPersonMachineRes;
    requestId?: string;
    bizCode?: string;
    static names(): { [key: string]: string } {
        return {
            personMachineRes: 'PersonMachineRes',
            requestId: 'RequestId',
            bizCode: 'BizCode',
        };
    }

    static types(): { [key: string]: any } {
        return {
            personMachineRes: DescribePersonMachineListResponseBodyPersonMachineRes,
            requestId: 'string',
            bizCode: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribePersonMachineListResponse extends $tea.Model {
    headers: { [key: string]: string };
    body: DescribePersonMachineListResponseBody;
    static names(): { [key: string]: string } {
        return {
            headers: 'headers',
            body: 'body',
        };
    }

    static types(): { [key: string]: any } {
        return {
            headers: { 'type': 'map', 'keyType': 'string', 'valueType': 'string' },
            body: DescribePersonMachineListResponseBody,
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class SetEarlyWarningRequest extends $tea.Model {
    sourceIp?: string;
    warnOpen?: boolean;
    channel?: string;
    frequency?: string;
    timeOpen?: boolean;
    timeBegin?: string;
    timeEnd?: string;
    title?: string;
    static names(): { [key: string]: string } {
        return {
            sourceIp: 'SourceIp',
            warnOpen: 'WarnOpen',
            channel: 'Channel',
            frequency: 'Frequency',
            timeOpen: 'TimeOpen',
            timeBegin: 'TimeBegin',
            timeEnd: 'TimeEnd',
            title: 'Title',
        };
    }

    static types(): { [key: string]: any } {
        return {
            sourceIp: 'string',
            warnOpen: 'boolean',
            channel: 'string',
            frequency: 'string',
            timeOpen: 'boolean',
            timeBegin: 'string',
            timeEnd: 'string',
            title: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class SetEarlyWarningResponseBody extends $tea.Model {
    requestId?: string;
    bizCode?: string;
    static names(): { [key: string]: string } {
        return {
            requestId: 'RequestId',
            bizCode: 'BizCode',
        };
    }

    static types(): { [key: string]: any } {
        return {
            requestId: 'string',
            bizCode: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class SetEarlyWarningResponse extends $tea.Model {
    headers: { [key: string]: string };
    body: SetEarlyWarningResponseBody;
    static names(): { [key: string]: string } {
        return {
            headers: 'headers',
            body: 'body',
        };
    }

    static types(): { [key: string]: any } {
        return {
            headers: { 'type': 'map', 'keyType': 'string', 'valueType': 'string' },
            body: SetEarlyWarningResponseBody,
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class UpdateConfigNameRequest extends $tea.Model {
    sourceIp?: string;
    lang?: string;
    refExtId?: string;
    configName?: string;
    static names(): { [key: string]: string } {
        return {
            sourceIp: 'SourceIp',
            lang: 'Lang',
            refExtId: 'RefExtId',
            configName: 'ConfigName',
        };
    }

    static types(): { [key: string]: any } {
        return {
            sourceIp: 'string',
            lang: 'string',
            refExtId: 'string',
            configName: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class UpdateConfigNameResponseBody extends $tea.Model {
    requestId?: string;
    bizCode?: string;
    static names(): { [key: string]: string } {
        return {
            requestId: 'RequestId',
            bizCode: 'BizCode',
        };
    }

    static types(): { [key: string]: any } {
        return {
            requestId: 'string',
            bizCode: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class UpdateConfigNameResponse extends $tea.Model {
    headers: { [key: string]: string };
    body: UpdateConfigNameResponseBody;
    static names(): { [key: string]: string } {
        return {
            headers: 'headers',
            body: 'body',
        };
    }

    static types(): { [key: string]: any } {
        return {
            headers: { 'type': 'map', 'keyType': 'string', 'valueType': 'string' },
            body: UpdateConfigNameResponseBody,
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class ConfigurationStyleResponseBodyCodeData extends $tea.Model {
    nodeJs?: string;
    javaUrl?: string;
    python?: string;
    java?: string;
    nodeJsUrl?: string;
    pythonUrl?: string;
    html?: string;
    phpUrl?: string;
    netUrl?: string;
    php?: string;
    net?: string;
    static names(): { [key: string]: string } {
        return {
            nodeJs: 'NodeJs',
            javaUrl: 'JavaUrl',
            python: 'Python',
            java: 'Java',
            nodeJsUrl: 'NodeJsUrl',
            pythonUrl: 'PythonUrl',
            html: 'Html',
            phpUrl: 'PhpUrl',
            netUrl: 'NetUrl',
            php: 'Php',
            net: 'Net',
        };
    }

    static types(): { [key: string]: any } {
        return {
            nodeJs: 'string',
            javaUrl: 'string',
            python: 'string',
            java: 'string',
            nodeJsUrl: 'string',
            pythonUrl: 'string',
            html: 'string',
            phpUrl: 'string',
            netUrl: 'string',
            php: 'string',
            net: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsConfigNameResponseBodyConfigNames extends $tea.Model {
    configName?: string;
    appKey?: string;
    refExtId?: string;
    aliUid?: string;
    scene?: string;
    static names(): { [key: string]: string } {
        return {
            configName: 'ConfigName',
            appKey: 'AppKey',
            refExtId: 'RefExtId',
            aliUid: 'AliUid',
            scene: 'Scene',
        };
    }

    static types(): { [key: string]: any } {
        return {
            configName: 'string',
            appKey: 'string',
            refExtId: 'string',
            aliUid: 'string',
            scene: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsOneConfDataResponseBodyIcOneConfDatas extends $tea.Model {
    icSigCnt?: number;
    icBlockCnt?: number;
    tableDate?: string;
    icVerifyCnt?: number;
    icSecVerifyCnt?: number;
    icInitCnt?: number;
    icNoActionCnt?: number;
    static names(): { [key: string]: string } {
        return {
            icSigCnt: 'IcSigCnt',
            icBlockCnt: 'IcBlockCnt',
            tableDate: 'TableDate',
            icVerifyCnt: 'IcVerifyCnt',
            icSecVerifyCnt: 'IcSecVerifyCnt',
            icInitCnt: 'IcInitCnt',
            icNoActionCnt: 'IcNoActionCnt',
        };
    }

    static types(): { [key: string]: any } {
        return {
            icSigCnt: 'number',
            icBlockCnt: 'number',
            tableDate: 'string',
            icVerifyCnt: 'number',
            icSecVerifyCnt: 'number',
            icInitCnt: 'number',
            icNoActionCnt: 'number',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsOneConfDataResponseBodyNcOneConfDatas extends $tea.Model {
    tableDate?: string;
    ncSigCnt?: number;
    ncVerifyCnt?: number;
    ncNoActionCnt?: number;
    ncVerifyBlockCnt?: number;
    ncInitCnt?: number;
    ncSigBlockCnt?: number;
    static names(): { [key: string]: string } {
        return {
            tableDate: 'TableDate',
            ncSigCnt: 'NcSigCnt',
            ncVerifyCnt: 'NcVerifyCnt',
            ncNoActionCnt: 'NcNoActionCnt',
            ncVerifyBlockCnt: 'NcVerifyBlockCnt',
            ncInitCnt: 'NcInitCnt',
            ncSigBlockCnt: 'NcSigBlockCnt',
        };
    }

    static types(): { [key: string]: any } {
        return {
            tableDate: 'string',
            ncSigCnt: 'number',
            ncVerifyCnt: 'number',
            ncNoActionCnt: 'number',
            ncVerifyBlockCnt: 'number',
            ncInitCnt: 'number',
            ncSigBlockCnt: 'number',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsOneConfDataResponseBodyNvcOneConfDatas extends $tea.Model {
    nvcNoActionCnt?: number;
    nvcSecVerifyCnt?: number;
    tableDate?: string;
    nvcVerifyCnt?: number;
    nvcBlockCnt?: number;
    nvcInitCnt?: number;
    static names(): { [key: string]: string } {
        return {
            nvcNoActionCnt: 'NvcNoActionCnt',
            nvcSecVerifyCnt: 'NvcSecVerifyCnt',
            tableDate: 'TableDate',
            nvcVerifyCnt: 'NvcVerifyCnt',
            nvcBlockCnt: 'NvcBlockCnt',
            nvcInitCnt: 'NvcInitCnt',
        };
    }

    static types(): { [key: string]: any } {
        return {
            nvcNoActionCnt: 'number',
            nvcSecVerifyCnt: 'number',
            tableDate: 'string',
            nvcVerifyCnt: 'number',
            nvcBlockCnt: 'number',
            nvcInitCnt: 'number',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsTotalConfDataResponseBodyIcTotalConfSigDatas extends $tea.Model {
    time?: string;
    value?: number;
    category?: string;
    static names(): { [key: string]: string } {
        return {
            time: 'Time',
            value: 'Value',
            category: 'Category',
        };
    }

    static types(): { [key: string]: any } {
        return {
            time: 'string',
            value: 'number',
            category: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsTotalConfDataResponseBodyNvcTotalConfSecVerifyDatas extends $tea.Model {
    time?: string;
    value?: number;
    category?: string;
    static names(): { [key: string]: string } {
        return {
            time: 'Time',
            value: 'Value',
            category: 'Category',
        };
    }

    static types(): { [key: string]: any } {
        return {
            time: 'string',
            value: 'number',
            category: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsTotalConfDataResponseBodyIcTotalConfVerifyDatas extends $tea.Model {
    time?: string;
    value?: number;
    category?: string;
    static names(): { [key: string]: string } {
        return {
            time: 'Time',
            value: 'Value',
            category: 'Category',
        };
    }

    static types(): { [key: string]: any } {
        return {
            time: 'string',
            value: 'number',
            category: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsTotalConfDataResponseBodyNvcTotalConfVerifyDatas extends $tea.Model {
    time?: string;
    value?: number;
    category?: string;
    static names(): { [key: string]: string } {
        return {
            time: 'Time',
            value: 'Value',
            category: 'Category',
        };
    }

    static types(): { [key: string]: any } {
        return {
            time: 'string',
            value: 'number',
            category: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsTotalConfDataResponseBodyIcTotalConfSecVerifyDatas extends $tea.Model {
    time?: string;
    value?: number;
    category?: string;
    static names(): { [key: string]: string } {
        return {
            time: 'Time',
            value: 'Value',
            category: 'Category',
        };
    }

    static types(): { [key: string]: any } {
        return {
            time: 'string',
            value: 'number',
            category: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsTotalConfDataResponseBodyNcTotalConfBlockDatas extends $tea.Model {
    time?: string;
    value?: number;
    category?: string;
    static names(): { [key: string]: string } {
        return {
            time: 'Time',
            value: 'Value',
            category: 'Category',
        };
    }

    static types(): { [key: string]: any } {
        return {
            time: 'string',
            value: 'number',
            category: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsTotalConfDataResponseBodyIcTotalConfBlockDatas extends $tea.Model {
    time?: string;
    value?: number;
    category?: string;
    static names(): { [key: string]: string } {
        return {
            time: 'Time',
            value: 'Value',
            category: 'Category',
        };
    }

    static types(): { [key: string]: any } {
        return {
            time: 'string',
            value: 'number',
            category: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsTotalConfDataResponseBodyNcTotalConfSigDatas extends $tea.Model {
    time?: string;
    value?: number;
    category?: string;
    static names(): { [key: string]: string } {
        return {
            time: 'Time',
            value: 'Value',
            category: 'Category',
        };
    }

    static types(): { [key: string]: any } {
        return {
            time: 'string',
            value: 'number',
            category: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsTotalConfDataResponseBodyNcTotalConfVerifyDatas extends $tea.Model {
    time?: string;
    value?: number;
    category?: string;
    static names(): { [key: string]: string } {
        return {
            time: 'Time',
            value: 'Value',
            category: 'Category',
        };
    }

    static types(): { [key: string]: any } {
        return {
            time: 'string',
            value: 'number',
            category: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsVerifySigDataResponseBodyNvcCodeDatas extends $tea.Model {
    time?: string;
    nvcCode400?: number;
    nvcCode200?: number;
    nvcCode800?: number;
    nvcCode600?: number;
    static names(): { [key: string]: string } {
        return {
            time: 'Time',
            nvcCode400: 'NvcCode400',
            nvcCode200: 'NvcCode200',
            nvcCode800: 'NvcCode800',
            nvcCode600: 'NvcCode600',
        };
    }

    static types(): { [key: string]: any } {
        return {
            time: 'string',
            nvcCode400: 'number',
            nvcCode200: 'number',
            nvcCode800: 'number',
            nvcCode600: 'number',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsVerifySigDataResponseBodyNvcSecDatas extends $tea.Model {
    time?: string;
    nvcSecBlock?: number;
    nvcSecPass?: number;
    static names(): { [key: string]: string } {
        return {
            time: 'Time',
            nvcSecBlock: 'NvcSecBlock',
            nvcSecPass: 'NvcSecPass',
        };
    }

    static types(): { [key: string]: any } {
        return {
            time: 'string',
            nvcSecBlock: 'number',
            nvcSecPass: 'number',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsVerifySigDataResponseBodyIcVerifyDatas extends $tea.Model {
    icSigCnt?: number;
    time?: string;
    icBlockCnt?: number;
    icSecVerifyCnt?: number;
    icVerifyCnt?: number;
    static names(): { [key: string]: string } {
        return {
            icSigCnt: 'IcSigCnt',
            time: 'Time',
            icBlockCnt: 'IcBlockCnt',
            icSecVerifyCnt: 'IcSecVerifyCnt',
            icVerifyCnt: 'IcVerifyCnt',
        };
    }

    static types(): { [key: string]: any } {
        return {
            icSigCnt: 'number',
            time: 'string',
            icBlockCnt: 'number',
            icSecVerifyCnt: 'number',
            icVerifyCnt: 'number',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsVerifySigDataResponseBodyNcVerifyDatas extends $tea.Model {
    time?: string;
    ncVerifyPass?: number;
    ncVerifyBlock?: number;
    static names(): { [key: string]: string } {
        return {
            time: 'Time',
            ncVerifyPass: 'NcVerifyPass',
            ncVerifyBlock: 'NcVerifyBlock',
        };
    }

    static types(): { [key: string]: any } {
        return {
            time: 'string',
            ncVerifyPass: 'number',
            ncVerifyBlock: 'number',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsVerifySigDataResponseBodyNvcVerifyDatas extends $tea.Model {
    time?: string;
    nvcSecVerifyCnt?: number;
    nvcVerifyCnt?: number;
    static names(): { [key: string]: string } {
        return {
            time: 'Time',
            nvcSecVerifyCnt: 'NvcSecVerifyCnt',
            nvcVerifyCnt: 'NvcVerifyCnt',
        };
    }

    static types(): { [key: string]: any } {
        return {
            time: 'string',
            nvcSecVerifyCnt: 'number',
            nvcVerifyCnt: 'number',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsVerifySigDataResponseBodyIcSecVerifyDatas extends $tea.Model {
    icSecBlock?: number;
    time?: string;
    icSecPass?: number;
    static names(): { [key: string]: string } {
        return {
            icSecBlock: 'IcSecBlock',
            time: 'Time',
            icSecPass: 'IcSecPass',
        };
    }

    static types(): { [key: string]: any } {
        return {
            icSecBlock: 'number',
            time: 'string',
            icSecPass: 'number',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeAfsVerifySigDataResponseBodyNcSigDatas extends $tea.Model {
    time?: string;
    ncSigBlock?: number;
    ncSigPass?: number;
    static names(): { [key: string]: string } {
        return {
            time: 'Time',
            ncSigBlock: 'NcSigBlock',
            ncSigPass: 'NcSigPass',
        };
    }

    static types(): { [key: string]: any } {
        return {
            time: 'string',
            ncSigBlock: 'number',
            ncSigPass: 'number',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeCaptchaDayResponseBodyCaptchaDay extends $tea.Model {
    checkTested?: number;
    direcetStrategyInterception?: number;
    maliciousFlow?: number;
    pass?: number;
    legalSign?: number;
    uncheckTested?: number;
    askForVerify?: number;
    init?: number;
    twiceVerify?: number;
    static names(): { [key: string]: string } {
        return {
            checkTested: 'CheckTested',
            direcetStrategyInterception: 'DirecetStrategyInterception',
            maliciousFlow: 'MaliciousFlow',
            pass: 'Pass',
            legalSign: 'LegalSign',
            uncheckTested: 'UncheckTested',
            askForVerify: 'AskForVerify',
            init: 'Init',
            twiceVerify: 'TwiceVerify',
        };
    }

    static types(): { [key: string]: any } {
        return {
            checkTested: 'number',
            direcetStrategyInterception: 'number',
            maliciousFlow: 'number',
            pass: 'number',
            legalSign: 'number',
            uncheckTested: 'number',
            askForVerify: 'number',
            init: 'number',
            twiceVerify: 'number',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeCaptchaIpCityResponseBodyCaptchaIps extends $tea.Model {
    value?: number;
    ip?: string;
    static names(): { [key: string]: string } {
        return {
            value: 'Value',
            ip: 'Ip',
        };
    }

    static types(): { [key: string]: any } {
        return {
            value: 'number',
            ip: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeCaptchaIpCityResponseBodyCaptchaCities extends $tea.Model {
    pv?: number;
    lng?: string;
    lat?: string;
    location?: string;
    static names(): { [key: string]: string } {
        return {
            pv: 'Pv',
            lng: 'Lng',
            lat: 'Lat',
            location: 'Location',
        };
    }

    static types(): { [key: string]: any } {
        return {
            pv: 'number',
            lng: 'string',
            lat: 'string',
            location: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeCaptchaMinResponseBodyCaptchaMins extends $tea.Model {
    time?: string;
    pass?: string;
    interception?: string;
    static names(): { [key: string]: string } {
        return {
            time: 'Time',
            pass: 'Pass',
            interception: 'Interception',
        };
    }

    static types(): { [key: string]: any } {
        return {
            time: 'string',
            pass: 'string',
            interception: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeConfigNameResponseBodyConfigNames extends $tea.Model {
    configName?: string;
    refExtId?: string;
    aliUid?: string;
    static names(): { [key: string]: string } {
        return {
            configName: 'ConfigName',
            refExtId: 'RefExtId',
            aliUid: 'AliUid',
        };
    }

    static types(): { [key: string]: any } {
        return {
            configName: 'string',
            refExtId: 'string',
            aliUid: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribeEarlyWarningResponseBodyEarlyWarnings extends $tea.Model {
    frequency?: string;
    timeBegin?: string;
    timeEnd?: string;
    channel?: string;
    warnOpen?: boolean;
    title?: string;
    content?: string;
    timeOpen?: boolean;
    static names(): { [key: string]: string } {
        return {
            frequency: 'Frequency',
            timeBegin: 'TimeBegin',
            timeEnd: 'TimeEnd',
            channel: 'Channel',
            warnOpen: 'WarnOpen',
            title: 'Title',
            content: 'Content',
            timeOpen: 'TimeOpen',
        };
    }

    static types(): { [key: string]: any } {
        return {
            frequency: 'string',
            timeBegin: 'string',
            timeEnd: 'string',
            channel: 'string',
            warnOpen: 'boolean',
            title: 'string',
            content: 'string',
            timeOpen: 'boolean',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribePersonMachineListResponseBodyPersonMachineResPersonMachines extends $tea.Model {
    configurationName?: string;
    configurationMethod?: string;
    extId?: string;
    applyType?: string;
    lastUpdate?: string;
    scene?: string;
    sceneOriginal?: string;
    appkey?: string;
    static names(): { [key: string]: string } {
        return {
            configurationName: 'ConfigurationName',
            configurationMethod: 'ConfigurationMethod',
            extId: 'ExtId',
            applyType: 'ApplyType',
            lastUpdate: 'LastUpdate',
            scene: 'Scene',
            sceneOriginal: 'SceneOriginal',
            appkey: 'Appkey',
        };
    }

    static types(): { [key: string]: any } {
        return {
            configurationName: 'string',
            configurationMethod: 'string',
            extId: 'string',
            applyType: 'string',
            lastUpdate: 'string',
            scene: 'string',
            sceneOriginal: 'string',
            appkey: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}

export class DescribePersonMachineListResponseBodyPersonMachineRes extends $tea.Model {
    personMachines?: DescribePersonMachineListResponseBodyPersonMachineResPersonMachines[];
    hasConfiguration?: string;
    static names(): { [key: string]: string } {
        return {
            personMachines: 'PersonMachines',
            hasConfiguration: 'HasConfiguration',
        };
    }

    static types(): { [key: string]: any } {
        return {
            personMachines: { 'type': 'array', 'itemType': DescribePersonMachineListResponseBodyPersonMachineResPersonMachines },
            hasConfiguration: 'string',
        };
    }

    constructor(map?: { [key: string]: any }) {
        super(map);
    }
}


export default class Client extends OpenApi {

    constructor(config: $OpenApi.Config) {
        super(config);
        this._endpointRule = "regional";
        this._endpointMap = {
            'ap-northeast-1': "afs.aliyuncs.com",
            'ap-northeast-2-pop': "afs.aliyuncs.com",
            'ap-south-1': "afs.aliyuncs.com",
            'ap-southeast-1': "afs.aliyuncs.com",
            'ap-southeast-2': "afs.aliyuncs.com",
            'ap-southeast-3': "afs.aliyuncs.com",
            'ap-southeast-5': "afs.aliyuncs.com",
            'cn-beijing': "afs.aliyuncs.com",
            'cn-beijing-finance-1': "afs.aliyuncs.com",
            'cn-beijing-finance-pop': "afs.aliyuncs.com",
            'cn-beijing-gov-1': "afs.aliyuncs.com",
            'cn-beijing-nu16-b01': "afs.aliyuncs.com",
            'cn-chengdu': "afs.aliyuncs.com",
            'cn-edge-1': "afs.aliyuncs.com",
            'cn-fujian': "afs.aliyuncs.com",
            'cn-haidian-cm12-c01': "afs.aliyuncs.com",
            'cn-hangzhou-bj-b01': "afs.aliyuncs.com",
            'cn-hangzhou-finance': "afs.aliyuncs.com",
            'cn-hangzhou-internal-prod-1': "afs.aliyuncs.com",
            'cn-hangzhou-internal-test-1': "afs.aliyuncs.com",
            'cn-hangzhou-internal-test-2': "afs.aliyuncs.com",
            'cn-hangzhou-internal-test-3': "afs.aliyuncs.com",
            'cn-hangzhou-test-306': "afs.aliyuncs.com",
            'cn-hongkong': "afs.aliyuncs.com",
            'cn-hongkong-finance-pop': "afs.aliyuncs.com",
            'cn-huhehaote': "afs.aliyuncs.com",
            'cn-north-2-gov-1': "afs.aliyuncs.com",
            'cn-qingdao': "afs.aliyuncs.com",
            'cn-qingdao-nebula': "afs.aliyuncs.com",
            'cn-shanghai': "afs.aliyuncs.com",
            'cn-shanghai-et15-b01': "afs.aliyuncs.com",
            'cn-shanghai-et2-b01': "afs.aliyuncs.com",
            'cn-shanghai-finance-1': "afs.aliyuncs.com",
            'cn-shanghai-inner': "afs.aliyuncs.com",
            'cn-shanghai-internal-test-1': "afs.aliyuncs.com",
            'cn-shenzhen': "afs.aliyuncs.com",
            'cn-shenzhen-finance-1': "afs.aliyuncs.com",
            'cn-shenzhen-inner': "afs.aliyuncs.com",
            'cn-shenzhen-st4-d01': "afs.aliyuncs.com",
            'cn-shenzhen-su18-b01': "afs.aliyuncs.com",
            'cn-wuhan': "afs.aliyuncs.com",
            'cn-yushanfang': "afs.aliyuncs.com",
            'cn-zhangbei-na61-b01': "afs.aliyuncs.com",
            'cn-zhangjiakou': "afs.aliyuncs.com",
            'cn-zhangjiakou-na62-a01': "afs.aliyuncs.com",
            'cn-zhengzhou-nebula-1': "afs.aliyuncs.com",
            'eu-central-1': "afs.aliyuncs.com",
            'eu-west-1': "afs.aliyuncs.com",
            'eu-west-1-oxs': "afs.aliyuncs.com",
            'me-east-1': "afs.aliyuncs.com",
            'rus-west-1-pop': "afs.aliyuncs.com",
            'us-east-1': "afs.aliyuncs.com",
            'us-west-1': "afs.aliyuncs.com",
        };
        this.checkConfig(config);
        this._endpoint = this.getEndpoint("afs", this._regionId, this._endpointRule, this._network, this._suffix, this._endpointMap, this._endpoint);
    }


    getEndpoint(productId: string, regionId: string, endpointRule: string, network: string, suffix: string, endpointMap: { [key: string]: string }, endpoint: string): string {
        if (!Util.empty(endpoint)) {
            return endpoint;
        }

        if (!Util.isUnset(endpointMap) && !Util.empty(endpointMap[regionId])) {
            return endpointMap[regionId];
        }

        return EndpointUtil.getEndpointRules(productId, regionId, endpointRule, network, suffix);
    }

    async analyzeNvcWithOptions(request: AnalyzeNvcRequest, runtime: $Util.RuntimeOptions): Promise<AnalyzeNvcResponse> {
        Util.validateModel(request);
        let req = new $OpenApi.OpenApiRequest({
            body: Util.toMap(request),
        });
        return $tea.cast<AnalyzeNvcResponse>(await this.doRPCRequest("AnalyzeNvc", "2018-01-12", "HTTPS", "POST", "AK", "json", req, runtime), new AnalyzeNvcResponse({}));
    }

    async analyzeNvc(request: AnalyzeNvcRequest): Promise<AnalyzeNvcResponse> {
        let runtime = new $Util.RuntimeOptions({});
        return await this.analyzeNvcWithOptions(request, runtime);
    }

    async authenticateSigWithOptions(request: AuthenticateSigRequest, runtime: $Util.RuntimeOptions): Promise<AuthenticateSigResponse> {
        Util.validateModel(request);
        let req = new $OpenApi.OpenApiRequest({
            body: Util.toMap(request),
        });
        return $tea.cast<AuthenticateSigResponse>(await this.doRPCRequest("AuthenticateSig", "2018-01-12", "HTTPS", "POST", "AK", "json", req, runtime), new AuthenticateSigResponse({}));
    }

    async authenticateSig(request: AuthenticateSigRequest): Promise<AuthenticateSigResponse> {
        let runtime = new $Util.RuntimeOptions({});
        return await this.authenticateSigWithOptions(request, runtime);
    }

    async configurationStyleWithOptions(request: ConfigurationStyleRequest, runtime: $Util.RuntimeOptions): Promise<ConfigurationStyleResponse> {
        Util.validateModel(request);
        let req = new $OpenApi.OpenApiRequest({
            body: Util.toMap(request),
        });
        return $tea.cast<ConfigurationStyleResponse>(await this.doRPCRequest("ConfigurationStyle", "2018-01-12", "HTTPS", "POST", "AK", "json", req, runtime), new ConfigurationStyleResponse({}));
    }

    async configurationStyle(request: ConfigurationStyleRequest): Promise<ConfigurationStyleResponse> {
        let runtime = new $Util.RuntimeOptions({});
        return await this.configurationStyleWithOptions(request, runtime);
    }

    async createConfigurationWithOptions(request: CreateConfigurationRequest, runtime: $Util.RuntimeOptions): Promise<CreateConfigurationResponse> {
        Util.validateModel(request);
        let req = new $OpenApi.OpenApiRequest({
            body: Util.toMap(request),
        });
        return $tea.cast<CreateConfigurationResponse>(await this.doRPCRequest("CreateConfiguration", "2018-01-12", "HTTPS", "POST", "AK", "json", req, runtime), new CreateConfigurationResponse({}));
    }

    async createConfiguration(request: CreateConfigurationRequest): Promise<CreateConfigurationResponse> {
        let runtime = new $Util.RuntimeOptions({});
        return await this.createConfigurationWithOptions(request, runtime);
    }

    async describeAfsConfigNameWithOptions(request: DescribeAfsConfigNameRequest, runtime: $Util.RuntimeOptions): Promise<DescribeAfsConfigNameResponse> {
        Util.validateModel(request);
        let req = new $OpenApi.OpenApiRequest({
            body: Util.toMap(request),
        });
        return $tea.cast<DescribeAfsConfigNameResponse>(await this.doRPCRequest("DescribeAfsConfigName", "2018-01-12", "HTTPS", "POST", "AK", "json", req, runtime), new DescribeAfsConfigNameResponse({}));
    }

    async describeAfsConfigName(request: DescribeAfsConfigNameRequest): Promise<DescribeAfsConfigNameResponse> {
        let runtime = new $Util.RuntimeOptions({});
        return await this.describeAfsConfigNameWithOptions(request, runtime);
    }

    async describeAfsOneConfDataWithOptions(request: DescribeAfsOneConfDataRequest, runtime: $Util.RuntimeOptions): Promise<DescribeAfsOneConfDataResponse> {
        Util.validateModel(request);
        let req = new $OpenApi.OpenApiRequest({
            body: Util.toMap(request),
        });
        return $tea.cast<DescribeAfsOneConfDataResponse>(await this.doRPCRequest("DescribeAfsOneConfData", "2018-01-12", "HTTPS", "POST", "AK", "json", req, runtime), new DescribeAfsOneConfDataResponse({}));
    }

    async describeAfsOneConfData(request: DescribeAfsOneConfDataRequest): Promise<DescribeAfsOneConfDataResponse> {
        let runtime = new $Util.RuntimeOptions({});
        return await this.describeAfsOneConfDataWithOptions(request, runtime);
    }

    async describeAfsTotalConfDataWithOptions(request: DescribeAfsTotalConfDataRequest, runtime: $Util.RuntimeOptions): Promise<DescribeAfsTotalConfDataResponse> {
        Util.validateModel(request);
        let req = new $OpenApi.OpenApiRequest({
            body: Util.toMap(request),
        });
        return $tea.cast<DescribeAfsTotalConfDataResponse>(await this.doRPCRequest("DescribeAfsTotalConfData", "2018-01-12", "HTTPS", "POST", "AK", "json", req, runtime), new DescribeAfsTotalConfDataResponse({}));
    }

    async describeAfsTotalConfData(request: DescribeAfsTotalConfDataRequest): Promise<DescribeAfsTotalConfDataResponse> {
        let runtime = new $Util.RuntimeOptions({});
        return await this.describeAfsTotalConfDataWithOptions(request, runtime);
    }

    async describeAfsVerifySigDataWithOptions(request: DescribeAfsVerifySigDataRequest, runtime: $Util.RuntimeOptions): Promise<DescribeAfsVerifySigDataResponse> {
        Util.validateModel(request);
        let req = new $OpenApi.OpenApiRequest({
            body: Util.toMap(request),
        });
        return $tea.cast<DescribeAfsVerifySigDataResponse>(await this.doRPCRequest("DescribeAfsVerifySigData", "2018-01-12", "HTTPS", "POST", "AK", "json", req, runtime), new DescribeAfsVerifySigDataResponse({}));
    }

    async describeAfsVerifySigData(request: DescribeAfsVerifySigDataRequest): Promise<DescribeAfsVerifySigDataResponse> {
        let runtime = new $Util.RuntimeOptions({});
        return await this.describeAfsVerifySigDataWithOptions(request, runtime);
    }

    async describeCaptchaDayWithOptions(request: DescribeCaptchaDayRequest, runtime: $Util.RuntimeOptions): Promise<DescribeCaptchaDayResponse> {
        Util.validateModel(request);
        let req = new $OpenApi.OpenApiRequest({
            body: Util.toMap(request),
        });
        return $tea.cast<DescribeCaptchaDayResponse>(await this.doRPCRequest("DescribeCaptchaDay", "2018-01-12", "HTTPS", "POST", "AK", "json", req, runtime), new DescribeCaptchaDayResponse({}));
    }

    async describeCaptchaDay(request: DescribeCaptchaDayRequest): Promise<DescribeCaptchaDayResponse> {
        let runtime = new $Util.RuntimeOptions({});
        return await this.describeCaptchaDayWithOptions(request, runtime);
    }

    async describeCaptchaIpCityWithOptions(request: DescribeCaptchaIpCityRequest, runtime: $Util.RuntimeOptions): Promise<DescribeCaptchaIpCityResponse> {
        Util.validateModel(request);
        let req = new $OpenApi.OpenApiRequest({
            body: Util.toMap(request),
        });
        return $tea.cast<DescribeCaptchaIpCityResponse>(await this.doRPCRequest("DescribeCaptchaIpCity", "2018-01-12", "HTTPS", "POST", "AK", "json", req, runtime), new DescribeCaptchaIpCityResponse({}));
    }

    async describeCaptchaIpCity(request: DescribeCaptchaIpCityRequest): Promise<DescribeCaptchaIpCityResponse> {
        let runtime = new $Util.RuntimeOptions({});
        return await this.describeCaptchaIpCityWithOptions(request, runtime);
    }

    async describeCaptchaMinWithOptions(request: DescribeCaptchaMinRequest, runtime: $Util.RuntimeOptions): Promise<DescribeCaptchaMinResponse> {
        Util.validateModel(request);
        let req = new $OpenApi.OpenApiRequest({
            body: Util.toMap(request),
        });
        return $tea.cast<DescribeCaptchaMinResponse>(await this.doRPCRequest("DescribeCaptchaMin", "2018-01-12", "HTTPS", "POST", "AK", "json", req, runtime), new DescribeCaptchaMinResponse({}));
    }

    async describeCaptchaMin(request: DescribeCaptchaMinRequest): Promise<DescribeCaptchaMinResponse> {
        let runtime = new $Util.RuntimeOptions({});
        return await this.describeCaptchaMinWithOptions(request, runtime);
    }

    async describeCaptchaOrderWithOptions(request: DescribeCaptchaOrderRequest, runtime: $Util.RuntimeOptions): Promise<DescribeCaptchaOrderResponse> {
        Util.validateModel(request);
        let req = new $OpenApi.OpenApiRequest({
            body: Util.toMap(request),
        });
        return $tea.cast<DescribeCaptchaOrderResponse>(await this.doRPCRequest("DescribeCaptchaOrder", "2018-01-12", "HTTPS", "POST", "AK", "json", req, runtime), new DescribeCaptchaOrderResponse({}));
    }

    async describeCaptchaOrder(request: DescribeCaptchaOrderRequest): Promise<DescribeCaptchaOrderResponse> {
        let runtime = new $Util.RuntimeOptions({});
        return await this.describeCaptchaOrderWithOptions(request, runtime);
    }

    async describeCaptchaRiskWithOptions(request: DescribeCaptchaRiskRequest, runtime: $Util.RuntimeOptions): Promise<DescribeCaptchaRiskResponse> {
        Util.validateModel(request);
        let req = new $OpenApi.OpenApiRequest({
            body: Util.toMap(request),
        });
        return $tea.cast<DescribeCaptchaRiskResponse>(await this.doRPCRequest("DescribeCaptchaRisk", "2018-01-12", "HTTPS", "POST", "AK", "json", req, runtime), new DescribeCaptchaRiskResponse({}));
    }

    async describeCaptchaRisk(request: DescribeCaptchaRiskRequest): Promise<DescribeCaptchaRiskResponse> {
        let runtime = new $Util.RuntimeOptions({});
        return await this.describeCaptchaRiskWithOptions(request, runtime);
    }

    async describeConfigNameWithOptions(request: DescribeConfigNameRequest, runtime: $Util.RuntimeOptions): Promise<DescribeConfigNameResponse> {
        Util.validateModel(request);
        let req = new $OpenApi.OpenApiRequest({
            body: Util.toMap(request),
        });
        return $tea.cast<DescribeConfigNameResponse>(await this.doRPCRequest("DescribeConfigName", "2018-01-12", "HTTPS", "POST", "AK", "json", req, runtime), new DescribeConfigNameResponse({}));
    }

    async describeConfigName(request: DescribeConfigNameRequest): Promise<DescribeConfigNameResponse> {
        let runtime = new $Util.RuntimeOptions({});
        return await this.describeConfigNameWithOptions(request, runtime);
    }

    async describeEarlyWarningWithOptions(request: DescribeEarlyWarningRequest, runtime: $Util.RuntimeOptions): Promise<DescribeEarlyWarningResponse> {
        Util.validateModel(request);
        let req = new $OpenApi.OpenApiRequest({
            body: Util.toMap(request),
        });
        return $tea.cast<DescribeEarlyWarningResponse>(await this.doRPCRequest("DescribeEarlyWarning", "2018-01-12", "HTTPS", "POST", "AK", "json", req, runtime), new DescribeEarlyWarningResponse({}));
    }

    async describeEarlyWarning(request: DescribeEarlyWarningRequest): Promise<DescribeEarlyWarningResponse> {
        let runtime = new $Util.RuntimeOptions({});
        return await this.describeEarlyWarningWithOptions(request, runtime);
    }

    async describeOrderInfoWithOptions(request: DescribeOrderInfoRequest, runtime: $Util.RuntimeOptions): Promise<DescribeOrderInfoResponse> {
        Util.validateModel(request);
        let req = new $OpenApi.OpenApiRequest({
            body: Util.toMap(request),
        });
        return $tea.cast<DescribeOrderInfoResponse>(await this.doRPCRequest("DescribeOrderInfo", "2018-01-12", "HTTPS", "POST", "AK", "json", req, runtime), new DescribeOrderInfoResponse({}));
    }

    async describeOrderInfo(request: DescribeOrderInfoRequest): Promise<DescribeOrderInfoResponse> {
        let runtime = new $Util.RuntimeOptions({});
        return await this.describeOrderInfoWithOptions(request, runtime);
    }

    async describePersonMachineListWithOptions(request: DescribePersonMachineListRequest, runtime: $Util.RuntimeOptions): Promise<DescribePersonMachineListResponse> {
        Util.validateModel(request);
        let req = new $OpenApi.OpenApiRequest({
            body: Util.toMap(request),
        });
        return $tea.cast<DescribePersonMachineListResponse>(await this.doRPCRequest("DescribePersonMachineList", "2018-01-12", "HTTPS", "POST", "AK", "json", req, runtime), new DescribePersonMachineListResponse({}));
    }

    async describePersonMachineList(request: DescribePersonMachineListRequest): Promise<DescribePersonMachineListResponse> {
        let runtime = new $Util.RuntimeOptions({});
        return await this.describePersonMachineListWithOptions(request, runtime);
    }

    async setEarlyWarningWithOptions(request: SetEarlyWarningRequest, runtime: $Util.RuntimeOptions): Promise<SetEarlyWarningResponse> {
        Util.validateModel(request);
        let req = new $OpenApi.OpenApiRequest({
            body: Util.toMap(request),
        });
        return $tea.cast<SetEarlyWarningResponse>(await this.doRPCRequest("SetEarlyWarning", "2018-01-12", "HTTPS", "POST", "AK", "json", req, runtime), new SetEarlyWarningResponse({}));
    }

    async setEarlyWarning(request: SetEarlyWarningRequest): Promise<SetEarlyWarningResponse> {
        let runtime = new $Util.RuntimeOptions({});
        return await this.setEarlyWarningWithOptions(request, runtime);
    }

    async updateConfigNameWithOptions(request: UpdateConfigNameRequest, runtime: $Util.RuntimeOptions): Promise<UpdateConfigNameResponse> {
        Util.validateModel(request);
        let req = new $OpenApi.OpenApiRequest({
            body: Util.toMap(request),
        });
        return $tea.cast<UpdateConfigNameResponse>(await this.doRPCRequest("UpdateConfigName", "2018-01-12", "HTTPS", "POST", "AK", "json", req, runtime), new UpdateConfigNameResponse({}));
    }

    async updateConfigName(request: UpdateConfigNameRequest): Promise<UpdateConfigNameResponse> {
        let runtime = new $Util.RuntimeOptions({});
        return await this.updateConfigNameWithOptions(request, runtime);
    }

}
