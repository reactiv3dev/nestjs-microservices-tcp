export class EmailCampaignEvent {
    constructor(public readonly from: string,
    public readonly to: string[],
    public readonly body: string){}
}