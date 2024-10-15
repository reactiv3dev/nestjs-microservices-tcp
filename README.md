# nestjs-microservices-tcp
Nestjs Microservices Example Implementation using TCP as transport protocol

## 1. Intializing applications/services
 - All apps are separately initialized by using command: 
 ```ts
 nest new <app_name>
 ```

 - Inside each app base directory .git file  should be removed in order 
 to  be able to track changes from root directory of project.
 ```cmd
 rm -rf <app_name>/.git
 or
 del <app_name>/.git
 ```

 ## GATEWAY Service Application
 - main responsibility is to check authorization, rate limit and handle traffic to other services
 1. Should register other services by importing ClientsModule from `@nestjs/microservices` and registering
 ```ts
 import { ClientsModule, Transport  } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COMMUNICATION_SERVICE',
        transport: Transport.TCP,
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
 
 ``` 

- 2. Example REST Api route to send email to list of emails with mail body payload provided as DTO.

1st POST route:
```ts
  @Post('/commit-email-campaign')
  commitCampaign(@Body() emailCampaignDto: EmailCampaignDto){
    this.appService.commitEmailCampagin(emailCampaignDto);
  }
```

2nd Service which will emit event through TCP to ClientProxy:
```ts
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EmailCampaignDto } from './dto/EmailCampaign.dto';
import { EmailCampaignEvent } from './events/EmailCampaignEvent';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    @Inject('COMMUNICATION_SERVICE') private readonly communicationClient: ClientProxy
  ){}


  async commitEmailCampagin(emailCampaginDto: EmailCampaignDto){
    this.logger.log(`Proceeding payload to COMMUNICATION_SERVICE: ${emailCampaginDto}`)
    this.communicationClient.emit('commit-email-campaign', new EmailCampaignEvent(
      "user@email.com",
      [...emailCampaginDto.emailList],
      emailCampaginDto.emailBody
    ));

  }
}
```

- 3. In Communication Service we would use decorator that will check for emmited event pattern (a string), that will match decorated route like in: 

```

```