> ## Documentation Index
> Fetch the complete documentation index at: https://developers.notion.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Notion API Overview

> Discover how to leverage Notion's Public API to build integrations.

## Using Notion's Public API for Integrations

A Notion workspace is a collaborative environment where teams can organize work, manage projects, and store information in a highly customizable way. Notion's REST API facilitates direct interactions with workspace elements through programming. Key functionalities include:

<CardGroup cols={2}>
  <Card title="Pages" icon="file-lines" href="/guides/data-apis/working-with-page-content" horizontal color="#0076d7">
    Create, update, and retrieve page content.
  </Card>

  <Card title="Databases" icon="database" href="/guides/data-apis/working-with-databases" horizontal color="#0076d7">
    Manage database, properties, entries, and schemas.
  </Card>

  <Card title="Data Sources" icon="database" href="/reference/create-a-data-source" horizontal color="#0076d7">
    Manage data sources, properties, entries, and schemas.
  </Card>

  <Card title="Users" icon="users" href="/reference/user" horizontal color="#0076d7">
    Access user profiles and permissions.
  </Card>

  <Card title="Comments" icon="comment-dots" href="/guides/data-apis/working-with-comments" horizontal color="#0076d7">
    Handle page and inline comments.
  </Card>

  <Card title="Content Queries" icon="magnifying-glass" href="/reference/post-search" horizontal color="#0076d7">
    Search through workspace content.
  </Card>

  <Card title="Authentication" icon="key" href="/guides/get-started/authorization" horizontal color="#0076d7">
    Secure integrations with OAuth 2.0.
  </Card>

  <Card title="Link Previews" icon="link" href="/guides/link-previews/link-previews" horizontal color="#0076d7">
    Customize how links appear when shared.
  </Card>
</CardGroup>

To make interactions within Notion workspaces programmatically, you must associate these actions with a Notion user. Notion facilitates this by allowing API requests to be linked to a "bot" user.

Developers create integrations to define a bot's capabilities, including authenticating API requests, deciding when to make requests, and setting the bot's read/write permissions. Essentially, using Notion's Public API involves creating an integration that outlines how a bot interacts with your workspace and assigns REST API requests to the bot.

There are two primary integration types:

* [**Internal**](#internal-vs-public-integrations): For private workspace workflows and automations.
* [**Public**](#internal-vs-public-integrations): For broader, shareable functionalities, including [Link Previews](/guides/link-previews/link-previews).

For further details on integration possibilities and API specifics, proceed with the guide or consult the [API reference](/reference/intro). Check out our [demos](/page/examples) for practical examples.

## What is a Notion Integration?

A Notion integration, sometimes referred as a [connection](https://www.notion.so/help/add-and-manage-connections-with-the-api), enables developers to programmatically interact with Notion workspaces. These integrations facilitate linking Notion workspace data with other applications or the automation of workflows within Notion.

Integrations are installed in Notion workspaces and require **explicit permission** from users to access Notion pages and databases.

<Frame caption="Create Notion integrations that unlock new possibilities for teams.">
  <img src="https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/0f06356-notion_overview.jpg?fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=ab31886c0c84514c8db8a2801d4fffe4" data-og-width="1800" width="1800" data-og-height="1200" height="1200" data-path="images/docs/0f06356-notion_overview.jpg" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/0f06356-notion_overview.jpg?w=280&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=21d5d398c973d82465297615cad6b879 280w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/0f06356-notion_overview.jpg?w=560&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=af5a2264b86ae5ffadb0ea53ada3cdfd 560w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/0f06356-notion_overview.jpg?w=840&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=c048e5f1db362ebf127263571cc7f41f 840w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/0f06356-notion_overview.jpg?w=1100&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=ffe19676cb29949f0f5eed1bc218a447 1100w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/0f06356-notion_overview.jpg?w=1650&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=945c38c6e6cd30861ab3ab94a9721e2c 1650w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/0f06356-notion_overview.jpg?w=2500&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=c06a22ed64ca97f2a5cd442c5edbefc8 2500w" />
</Frame>

Notion users have access to a vast [library](https://www.notion.so/integrations/all) of existing integrations to enrich their experience further. For developers interested in creating custom solutions, Notion supports the development of both internal and public integrations. Both utilize the Notion API for workspace interactions.

Let's explore internal and public integrations.

## Internal vs. Public Integrations

Notion integrations come in two types: Internal and Public. Understanding the differences between them helps in choosing the right approach for your development needs.

* **Internal Integrations** are exclusive to a single workspace, accessible only to its members. They are ideal for custom workspace automations and workflows.
* **Public Integrations** are designed for a wider audience, usable across any Notion workspace. They cater to broad use cases and follow the OAuth 2.0 protocol for workspace access.

<Warning>
  Public integrations must undergo a Notion security review before publishing.
</Warning>

### Key Differences

| Feature              | Internal Integrations                                                                               | Public Integrations                                                                                             |
| :------------------- | :-------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| Scope                | Confined to a single, specific workspace.                                                           | Available across multiple, unrelated workspaces.                                                                |
| User Access          | Only accessible by members of the workspace where it's installed.                                   | Accessible by any Notion user, regardless of their workspace.                                                   |
| Creation             | Created by Workspace Owners within the integration dashboard.                                       | Created by Workspace Owners within the integration dashboard.                                                   |
| Permissions          | Workspace members explicitly grant access to their pages or databases via Notion’s UI.              | Users authorize access to their pages during the OAuth flow, or by sharing pages directly with the integration. |
| OAuth Protocol       | Not applicable, as access is limited to a single workspace.                                         | Uses the OAuth 2.0 protocol to securely access information across multiple workspaces.                          |
| Dashboard Visibility | Visible to Workspace Owners in the integration dashboard, including integrations created by others. | -                                                                                                               |

## What You Can Build: Integration Use Cases

Notion’s REST API opens up a world of possibilities for integrations, ranging from enhancing internal workflow to creating public-facing applications. Here’s a closer look at some of the innovative integrations developers have built with Notion:

### Data Integrations

Data integrations leverage the Notion API to automate data flow between Notion and other systems.

* **Automated Notifications:** Develop integrations that monitor Notion databases for changes. Upon detecting a change, these integrations can automatically send notifications various communication channels.
* **Github Synchronization**: Create integrations that keep Notion issues in sync with GitHub issues.
* **External Data Import:** Build integrations that import data from external sources directly into Notion databases. This can include importing customer data, project updates, or any other relevant information.

<Card title="Examples:" icon="link" color="#0076d7">
  <CardGroup cols={2}>
    <Card title="Create an integration" icon="link" href="/guides/get-started/create-a-notion-integration" horizontal color="#0076d7" />

    <Card title="Working with comments" icon="comment-dots" href="/guides/data-apis/working-with-comments" horizontal color="#0076d7" />

    <Card title="Working with databases" icon="database" href="/guides/data-apis/working-with-databases" horizontal color="#0076d7" />

    <Card title="Working with files and media" icon="file-image" href="/guides/data-apis/working-with-files-and-media" horizontal color="#0076d7" />

    <Card title="Working with page content" icon="file-lines" href="/guides/data-apis/working-with-page-content" horizontal color="#0076d7" />
  </CardGroup>
</Card>

### Link Preview Integrations

Enhance the sharing experience within Notion with Link preview integrations, offering a glimpse into the content of shared links:

<Frame caption="Link Preview of a GitHub PR.">
  <img src="https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/ce5daa3-Screen_Shot_2023-06-27_at_3.48.22_PM.png?fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=9e77dea080a3e4d82012927d3107600e" data-og-width="1440" width="1440" data-og-height="124" height="124" data-path="images/docs/ce5daa3-Screen_Shot_2023-06-27_at_3.48.22_PM.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/ce5daa3-Screen_Shot_2023-06-27_at_3.48.22_PM.png?w=280&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=95e2b735fcfdd727e8b4dd903892cd34 280w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/ce5daa3-Screen_Shot_2023-06-27_at_3.48.22_PM.png?w=560&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=3ae39ad94cb6a30f63dfc37655445110 560w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/ce5daa3-Screen_Shot_2023-06-27_at_3.48.22_PM.png?w=840&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=014cb460ea5da84367d2012eb0c80fc3 840w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/ce5daa3-Screen_Shot_2023-06-27_at_3.48.22_PM.png?w=1100&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=0122dc9d4f5afb2ec865995f733b8a2c 1100w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/ce5daa3-Screen_Shot_2023-06-27_at_3.48.22_PM.png?w=1650&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=3fe858238b79cab19aa44a898377e510 1650w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/ce5daa3-Screen_Shot_2023-06-27_at_3.48.22_PM.png?w=2500&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=b25033a6958a4ed0623146ab6e5cd512 2500w" />
</Frame>

Create integrations that allow for the customization of how shared links are presented in Notion, providing context and enhancing engagement.

<Warning>
  Link Preview Integrations differ from public integrations. Review the [Link Preview guide](/guides/link-previews/build-a-link-preview-integration).
</Warning>

<Danger>
  To build a Link Preview integration, developers must first apply for access to the feature through the [Notion Link Preview API request form](https://notionup.typeform.com/to/BXheLK4Z?typeform-source=developers.notion.com).

  Link Preview integrations published for distribution require a review from Notion's platform and security teams.
</Danger>

<Card title="Quick Links" icon="link" color="#0076d7">
  <CardGroup cols={2}>
    <Card title="Introduction to Link Preview integrations" icon="link" href="/guides/link-previews/link-previews" horizontal color="#0076d7" />

    <Card title="Build a Link Preview integration" icon="paintbrush" href="/guides/link-previews/build-a-link-preview-integration" horizontal color="#0076d7" />

    <Card title="API reference docs for the Link Preview unfurl attribute object" icon="code-simple" href="/reference/unfurl-attribute-object" horizontal color="#0076d7" />

    <Card title="Help Centre" icon="circle-info" href="https://www.notion.so/help/guides/notion-api-link-previews-feature" horizontal color="#0076d7" />
  </CardGroup>
</Card>

### Identity Management Integrations (Enterprise Plans ONLY)

For enterprise-level workspaces, Notion offers advanced identity management capabilities:

* **SCIM API for User and Group Management**: Utilize the SCIM API to automate the provisioning and management of users and groups within enterprise workspaces, streamlining administrative tasks.
* **SAML SSO for Enhanced Security**: Implement Single Sign-On (SSO) using SAML for a secure and convenient authentication process, simplifying access for users across the enterprise.

<Card title="Quick Links" icon="link" color="#0076d7">
  <CardGroup cols={2}>
    <Card title="Provision users and groups with SCIM" icon="angles-right" href="https://www.notion.so/help/provision-users-and-groups-with-scim" horizontal color="#0076d7" />

    <Card title="SAML SSO configuration" icon="angles-right" href="https://www.notion.so/help/saml-sso-configuration" horizontal color="#0076d7" />
  </CardGroup>
</Card>

## Starting Your Integration Journey

Embarking on building an integration with Notion? Begin with our foundational [*Build your first integration guide*](/guides/get-started/create-a-notion-integration). As you become more familiar with the basics, expand your knowledge and skills with in-depth guides on [Authorization](/guides/get-started/authorization), [Page content](/guides/data-apis/working-with-page-content), and [Databases](/guides/data-apis/working-with-databases).

## Key resources

* [Notion SDK for JavaScript](https://github.com/makenotion/notion-sdk-js): Leverage our SDK designed for JavaScript environments to simplify interactions with the REST API, making development more efficient.
* [Technology Partner Program](https://www.notion.so/technology-partner-program): Have you developed a public integrations? Join our Technology Partner Program for access to dedicated support, exclusive distribution channels, and marketing opportunities.

Explore these resources and join the [Notion Devs Slack community](https://join.slack.com/t/notiondevs/shared_invite/zt-20b5996xv-DzJdLiympy6jP0GGzu3AMg) to share your projects, gain insights from fellow developers, and discover new ways to enhance Notion with integrations.

<Card title="Quick Links" icon="link" color="#0076d7">
  <CardGroup cols={2}>
    <Card title="API reference documentation" icon="code-simple" href="/reference/intro" horizontal color="#0076d7" />

    <Card title="Notion SDK for JavaScript" icon="js" href="https://github.com/makenotion/notion-sdk-js" horizontal color="#0076d7" />

    <Card title="Postman collection" icon="box" href="https://www.postman.com/notionhq/" horizontal color="#0076d7" />

    <Card title="TypeScript starter template" icon="code" href="https://github.com/makenotion/notion-sdk-typescript-starter" horizontal color="#0076d7" />

    <Card title="FAQs" icon="circle-question" href="/page/frequently-asked-questions" horizontal color="#0076d7" />

    <Card title="Notion Devs Slack community" icon="slack" href="https://join.slack.com/t/notiondevs/shared_invite/zt-20b5996xv-DzJdLiympy6jP0GGzu3AMg" horizontal color="#0076d7" />
  </CardGroup>
</Card>

---

> ## Documentation Index
> Fetch the complete documentation index at: https://developers.notion.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Build your first integration

> Make your first request to the Notion API.

export const integrationsDashboardUrl = "https://www.notion.so/profile/integrations";

## Integration overview

In this guide, we're going to build an [internal Notion integration](/guides/get-started/getting-started#internal-vs-public-integrations) that can create a new database in your Notion workspace via a web form.

<Frame caption="Demo web app that creates new databases in your Notion workspace.">
  <img src="https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/55d7b4b-dbform.png?fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=495c0648da594ad5462fd3c001350b36" data-og-width="1240" width="1240" data-og-height="480" height="480" data-path="images/docs/55d7b4b-dbform.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/55d7b4b-dbform.png?w=280&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=babebb484a745bffc68c4b019dbf9973 280w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/55d7b4b-dbform.png?w=560&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=74d3a1ba839bb07f80a2be25b90c36ee 560w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/55d7b4b-dbform.png?w=840&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=cabb66c324484c346db4fc8fdab17256 840w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/55d7b4b-dbform.png?w=1100&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=54ec7526a3d6b42ab3650a2c9b615e4a 1100w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/55d7b4b-dbform.png?w=1650&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=e54791499998ea3f7ffcf10821cc4337 1650w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/55d7b4b-dbform.png?w=2500&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=e99f146f8717eb6c05a80c9e0dbf945b 2500w" />
</Frame>

Internal integrations are a good entry point to building integrations because they have a simpler [authorization](/guides/get-started/authorization) flow than [public integrations](/guides/get-started/getting-started#internal-vs-public-integrations).

Before diving in, let’s quickly review Notion integrations. Integrations define how the public API can programmatically interact with your Notion workspace. They need to be authorized (i.e., given explicit permission) to make any changes your workspace.

All integration types use Notion’s public API to make requests to update a Notion workspace. The specific use case for each integration can vary greatly, from using Notion as a CMS for a blog, to [tracking Github issues](https://github.com/makenotion/notion-cookbook/tree/main/examples/javascript/notion-github-sync), to [sending emails](https://github.com/makenotion/notion-cookbook/tree/main/examples/javascript/database-email-update) in response to Notion changes.

This guide is just one introductory example of what you can build with Notion’s public API.

## Today’s goals

This guide will demonstrate how to build an HTML form that will [create a new Notion database](/reference/create-a-database) when submitted.

By the end of this guide, we’ll have a functional app that looks like this:

<Frame caption="Database form UI.">
  <img src="https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/36a22d6-dbform.png?fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=5cf3ea645145647c5a83a198cc1ddc09" data-og-width="1240" width="1240" data-og-height="480" height="480" data-path="images/docs/36a22d6-dbform.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/36a22d6-dbform.png?w=280&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=7e22e26fb39c0f022073c3276b3dd5e5 280w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/36a22d6-dbform.png?w=560&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=160805bb1f948c7d371a8a420757389e 560w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/36a22d6-dbform.png?w=840&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=d86734afe2acbdc78970d0ad24d88102 840w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/36a22d6-dbform.png?w=1100&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=afc022a25b25d6cb03e7e57cd1a6a286 1100w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/36a22d6-dbform.png?w=1650&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=7673de86e1ec294aacee4f9c85ebd83f 1650w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/36a22d6-dbform.png?w=2500&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=8aa1e187792c7b222481de74e2aa63e8 2500w" />
</Frame>

The completed [sample code](https://github.com/makenotion/notion-cookbook/tree/main/examples/javascript/web-form-with-express) includes additional examples beyond what’s covered in this guide, including forms to:

* [Add a new page](/reference/post-page) to the database
* [Add content](/reference/patch-block-children) to the new page
* [Add a comment](/reference/create-a-comment) to the page content

### Requirements

To follow along with this guide, you will need:

* A [Notion account](https://www.notion.so/signup).
* To be a [Workspace Owner](https://www.notion.so/help/add-members-admins-guests-and-groups) in the workspace you’re using. You can create a new workspace for testing purposes otherwise.
* Knowledge of HTML and JavaScript. We’ll use [Express.js](https://expressjs.com/) for a server, as well.
* [npm and Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed locally to use the [Notion SDK for JavaScript](https://github.com/makenotion/notion-sdk-js) and [Express.js](https://expressjs.com/)

<Note>
  **SDK usage is recommended, but not required**

  The [sample code](https://github.com/makenotion/notion-cookbook/tree/main/examples/javascript/web-form-with-express) shown below uses the [Notion SDK for JavaScript](https://github.com/makenotion/notion-sdk-js) to make public API requests.

  Using the Notion SDK for JavaScript is not required to build a Notion integration, but many JavaScript developers prefer it due to its ease of use.
</Note>

## Getting started

### Create your integration in Notion

The first step to building any integration (internal or public) is to create a new integration in Notion's <a href={integrationsDashboardUrl}>integrations dashboard</a>.

<Steps>
  <Step>
    Click `+ New integration`.

    <Frame>
            <img src="https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/402cf3d-new_integrations_1.png?fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=925e1a5172b009a41519cbae169e2124" alt="" data-og-width="1198" width="1198" data-og-height="699" height="699" data-path="images/docs/402cf3d-new_integrations_1.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/402cf3d-new_integrations_1.png?w=280&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=b5914bf4a72fcf95a72a8319ef71623e 280w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/402cf3d-new_integrations_1.png?w=560&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=35e68c4b5ebeba5f9e8620b3964b51eb 560w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/402cf3d-new_integrations_1.png?w=840&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=505768b69b23f893447544bae90012e9 840w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/402cf3d-new_integrations_1.png?w=1100&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=5ba93e9965a811b4dc7413d20a7a3153 1100w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/402cf3d-new_integrations_1.png?w=1650&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=a74e3b4eecfa215106e0a2b1d11a59d1 1650w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/402cf3d-new_integrations_1.png?w=2500&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=0a0d6fc6e9d0556314d5f45e5beb36c6 2500w" />
    </Frame>
  </Step>

  <Step>
    Enter the integration name and select the associated workspace for the new integration.

    <Frame>
            <img src="https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/aef3bab-new_integrations_2.png?fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=d55ed2a2949f8b719643d18be3bbbb04" alt="" data-og-width="1198" width="1198" data-og-height="699" height="699" data-path="images/docs/aef3bab-new_integrations_2.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/aef3bab-new_integrations_2.png?w=280&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=e4b3219aab563ad54c0032d620a43b10 280w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/aef3bab-new_integrations_2.png?w=560&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=caeda7d86548b15799fbd931019b8f47 560w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/aef3bab-new_integrations_2.png?w=840&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=9f90147e8b3f222ecd81bcfa8ff00361 840w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/aef3bab-new_integrations_2.png?w=1100&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=0c94783b8719e3cbf074c840dbb16dff 1100w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/aef3bab-new_integrations_2.png?w=1650&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=f1208d185f6a5bec96a598209ab2fb6b 1650w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/aef3bab-new_integrations_2.png?w=2500&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=366dbcfe09e267ee87f8690a47b172e3 2500w" />
    </Frame>
  </Step>
</Steps>

### Get your API secret

API requests require an API secret to be successfully authenticated. Visit the `Configuration` tab to get your integration’s API secret (or “Internal Integration Secret”).

<Frame>
    <img src="https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/7ec836a-integrations_3.png?fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=177eb1a48ba6864af95ee77c30f09d6b" alt="" data-og-width="1198" width="1198" data-og-height="699" height="699" data-path="images/docs/7ec836a-integrations_3.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/7ec836a-integrations_3.png?w=280&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=963da82b7ac2ba7e945c157992325546 280w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/7ec836a-integrations_3.png?w=560&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=9c034050d65a97ba04799a68680e5e6d 560w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/7ec836a-integrations_3.png?w=840&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=757ed3f57454c6b415581b69a56832a6 840w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/7ec836a-integrations_3.png?w=1100&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=467106a3fe7c63a9ee4249d85dfec778 1100w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/7ec836a-integrations_3.png?w=1650&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=616c25badc029560c9b5498999a4bbac 1650w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/7ec836a-integrations_3.png?w=2500&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=04b5b81a506d62461508e93ee3380d32 2500w" />
</Frame>

<Check>
  **Keep your API secret a secret!**

  Any value used to authenticate API requests should always be kept secret. Use environment variables and avoid committing sensitive data to your version control history.

  If you do accidentally expose it, remember to “refresh” your secret.
</Check>

### Give your integration page permissions

The database that we’re about to create will be added to a parent Notion page in your workspace. For your integration to interact with the page, it needs explicit permission to read/write to that specific Notion page.

To give the integration permission, you will need to:

<Steps>
  <Step>
    Pick (or create) a Notion page.
  </Step>

  <Step>
    Click on the `...` More menu in the top-right corner of the page.
  </Step>

  <Step>
    Scroll down to `+ Add Connections`.
  </Step>

  <Step>
    Search for your integration and select it.
  </Step>

  <Step>
    Confirm the integration can access the page and all of its child pages.

    <Frame caption="Give your integration permission to add a database to a page.">
      <img src="https://mintcdn.com/notion-demo/kSI9TVzPayvF1_1o/images/docs/fefc809-permissions.gif?s=c2bfdc69ee0ef51e23ed404f4ee064be" data-og-width="600" width="600" data-og-height="322" height="322" data-path="images/docs/fefc809-permissions.gif" data-optimize="true" data-opv="3" />
    </Frame>
  </Step>
</Steps>

Your integration can now make API requests related to this Notion page and any of its children.

If you are building a public integration, use the authorization instructions included in the [Authorization guide](/guides/get-started/authorization#public-integration-auth-flow-set-up) instead.

<Warning>
  **Double-check your page access**

  If your API requests are failing, confirm you have given the integration permission to the page you are trying to update. This is a common cause of API request errors.
</Warning>

## Setting up the demo locally

In this example, we’ll have three key files:

* `index.html`, which will contain our client-side markdown (HTML).
* `client.js`, which will contain our client-side JavaScript code.
* `server.js`, which will contain our server-side JavaScript code. This file contains all the endpoints to make requests to Notion’s public API, as well as to serve the `index.html` file. ([More on that below.](#step-3-importing-the-notion-sdk-serverjs))

All of the sample code is available in [GitHub](https://github.com/makenotion/notion-cookbook/tree/main/examples/javascript/web-form-with-express).

<Note>
  **Various examples are available**

  This integration includes frontend code, but integrations can be server-side only, as well. See more examples of different integration use cases in [GitHub](https://github.com/makenotion/notion-cookbook/tree/main/examples/javascript).
</Note>

### Clone demo repo

To run this project locally, clone the repo and install its dependencies ([Express.js](https://expressjs.com/en/starter/installing.html), [dotenv](https://www.npmjs.com/package/dotenv), and [Notion’s SDK for JavaScript](https://github.com/makenotion/notion-sdk-js)):

```bash Shell theme={null}
# Clone this repository locally
git clone https://github.com/makenotion/notion-cookbook.git

# Switch into this project
cd notion-cookbook/examples/javascript/web-form-with-express/

# Install the dependencies
npm install
```

### Environment variables

In your `.env` file, add the following variables:

```bash .env theme={null}
NOTION_KEY=<your-notion-api-key>
NOTION_PAGE_ID=<parent-page-id>
```

Add the API secret you retrieved in `Getting Started` to `NOTION_KEY`, as well as a page ID (`NOTION_PAGE_ID`) for the page that you gave the integration permission to update.

<Check>
  **How database IDs work**

  When using the API to [create a database](/reference/create-a-database), the parent of a database must be a Notion page or a [wiki](https://www.notion.so/help/wikis-and-verified-pages) database. To get the ID of the page, locate the 32-character string at the end of the page’s URL.

  <Frame>
        <img src="https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/7e8a54d-notion-page-url.png?fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=cca5fbcef0cde568441ed14f791b345e" alt="The page ID is highlighted." data-og-width="1370" width="1370" data-og-height="304" height="304" data-path="images/docs/7e8a54d-notion-page-url.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/7e8a54d-notion-page-url.png?w=280&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=a3623f5b4329b1f75f0aa68327da14b2 280w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/7e8a54d-notion-page-url.png?w=560&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=f15f23b5410f81525850ee292dc0c097 560w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/7e8a54d-notion-page-url.png?w=840&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=4a959124081827e5c7e41e17ad896687 840w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/7e8a54d-notion-page-url.png?w=1100&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=d4a9d26d127e76ddbc75599f6ce025df 1100w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/7e8a54d-notion-page-url.png?w=1650&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=fd18ebaccea270f9a949bf6368ab86f9 1650w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/7e8a54d-notion-page-url.png?w=2500&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=3f531e50316dfe967795cd9347ba4a46 2500w" />
  </Frame>
</Check>

As a best practice, add `.env` to your `.gitignore` file to ensure you don’t accidentally share these values.

### Running the project locally

To run this project locally, you will need to enter the following command in your terminal:

<CodeGroup>
  ```bash Shell theme={null}
  npm start
  ```
</CodeGroup>

Next, let’s look at how our database form works.

## Creating a new database

### Step 1 - Adding a database form (`index.html`)

In our `index.html` file, we need a form for the user to create a new database and an area for the API response to be displayed. This is how the user will initiate a public API request.

<Frame caption="App design for creating a database.">
  <img src="https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/76077fd-new_database.png?fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=7642bb24306bb44e5902a27acfbf4dad" data-og-width="875" width="875" data-og-height="265" height="265" data-path="images/docs/76077fd-new_database.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/76077fd-new_database.png?w=280&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=847fc88e680e95fd328e549a28eac6a2 280w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/76077fd-new_database.png?w=560&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=937bcdf499869390e88183745643c548 560w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/76077fd-new_database.png?w=840&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=d76055a48e657e1310b6cfd70bcf95c2 840w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/76077fd-new_database.png?w=1100&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=d6815a62fa06d92078b8337ced4ee932 1100w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/76077fd-new_database.png?w=1650&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=7360dcfeac44f4b4cd8330fc8ae0f6c0 1650w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/76077fd-new_database.png?w=2500&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=b7e7acf069f28fb06495a61bb9759eb9 2500w" />
</Frame>

<Frame caption="Rendered app design for creating a database.">
  <img src="https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/c73de3e-dbform.png?fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=ec19efdc45203dbc0a195a971678a752" data-og-width="1240" width="1240" data-og-height="480" height="480" data-path="images/docs/c73de3e-dbform.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/c73de3e-dbform.png?w=280&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=acc10c6bd91a5da3cc3053d687a20bce 280w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/c73de3e-dbform.png?w=560&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=7a0e0c2548858683c1233b7d27760973 560w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/c73de3e-dbform.png?w=840&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=5cd002b5c7c52d9856267eaa4033d8ad 840w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/c73de3e-dbform.png?w=1100&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=ee340ec42aa160b0ce0c97ce3f2c066e 1100w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/c73de3e-dbform.png?w=1650&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=00f82aeecc61d134453c67532ce40773 1650w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/c73de3e-dbform.png?w=2500&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=530a8da074099231041cc52589843dcf 2500w" />
</Frame>

The corresponding [HTML elements](https://github.com/makenotion/notion-cookbook/blob/main/examples/javascript/web-form-with-express/views/index.html#L40) related to creating a database are shown below:

<CodeGroup>
  ```html HTML expandable theme={null}
  <!DOCTYPE html>
  <html lang="en">
    <head>
      ...
  <!-- Import the webpage's stylesheet -->
      <link rel="stylesheet" href="/style.css" />

  <!-- Import the webpage's client-side javascript file -->
      <script src="/client.js" defer></script>
    </head>
    <body>
      ...
        <table>
          ...
          <tr>
            <td>
              <h3>1. Create a new database</h3>
  <!-- Form to create a database -->
              <form id="databaseForm">
                <label for="dbName">Database name</label>
                <input type="text" id="dbName" />
                <input type="submit" />
              </form>
            </td>
  <!-- Empty table cell to append the API response to -->
            <td id="dbResponse"></td>
          </tr>
          ...
        </table>
      </main>
      ...
    </body>
  </html>
  ```
</CodeGroup>

In terms of what’s rendered in the `<body>`, notice the `<form>` element and an empty table cell with the ID `dbResponse`. The latter is where we’ll append the Notion API response information.

The database form includes two inputs:

* A text input for the database name
* A submit input to submit the form

Also of note: the `client.js` file is included in the document’s `<head>` tag, which allows us to apply client-side JavaScript to interact with these HTML elements.

### Step 2 - Handling the form submission (`client.js`)

In `client.js`, we can write a function to describe what should happen when the database form is submitted. In short, we want to make a request to `server.js` to then make an API request to Notion. The actual Notion API request will happen server-side to avoid exposing our API secret in the client. (In other words, it’s more secure!)

<CodeGroup>
  ```jsx JSX expandable theme={null}
  // Assign the database form to a variable for later use
  const dbForm = document.getElementById("databaseForm");
  // Assign the empty table cell to a variable for later use
  const dbResponseEl = document.getElementById("dbResponse");

  // Add a submit handler to the form
  dbForm.onsubmit = async function (event) {
    event.preventDefault()

  // Get the database name from the form
    const dbName = event.target.dbName.value
    const body = JSON.stringify({ dbName })

  // Make a request to /databases endpoint in server.js
    const newDBResponse = await fetch("/databases", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
    const newDBData = await newDBResponse.json()

  // Pass the new database info and the empty table cell
  // to a function that will append it.
    appendApiResponse(newDBData, dbResponseEl)
  }
  ```
</CodeGroup>

In this code block, we select the form element using its ID attribute with `getElementbyId()`.

Next, we attach an async function to the `onsubmit` event that will make a request to our local server’s `/databases` endpoint. (This endpoint will be described below in our `server.js` code.) The function is asynchronous because we need to wait for a response from our server before proceeding.

The response is then appended to our `index.html` document. ([More on this below.](#step-5-displaying-the-response-indexhtml))

### Step 3 - Importing the Notion SDK (`server.js`)

Let's start by looking at our `server.js` file without the Notion-related endpoints:

<CodeGroup>
  ```json JSON expandable theme={null}
  require("dotenv").config();
  const express = require("express");
  const app = express();

  // Notion SDK for JavaScript
  const { Client } = require("@notionhq/client");
  const notion = new Client({ auth: process.env.NOTION_KEY });

  // <http://expressjs.com/en/starter/static-files.html>
  app.use(express.static("public"));

  // <http://expressjs.com/en/starter/basic-routing.html>
  app.get("/", function(request, response) {
    response.sendFile(__dirname + "/views/index.html");
  });

  // listen for requests
  const listener = app.listen(process.env.PORT, function() {
    console.log("Your app is listening on port " + listener.address().port);
  });
  ```
</CodeGroup>

This Express.js code will listen for requests to `/` (e.g., `localhost:<port>/`) and respond with the `index.html` file. That’s how the app knows to render our `index.html` code when the server is started.

To use the SDK, we import it at the top of `server.js`. We also initialize a new Notion Client instance and set the `auth` option to the Notion API secret already set in the environment variables:

<CodeGroup>
  ```jsx JSX theme={null}
  const { Client } = require("@notionhq/client");
  const notion = new Client({ auth: process.env.NOTION_KEY });
  ```
</CodeGroup>

We can now make requests to Notion’s API in this file without having to worry about authentication again.

### Step 4 - Handling the form’s POST request (`server.js`)

Staying in `server.js`, we can add the following code that will be invoked when the database form makes a POST request to `/databases`:

<CodeGroup>
  ```jsx TypeScript expandable theme={null}
  app.post("/databases", async function (request, response) {
    const pageId = process.env.NOTION_PAGE_ID;
    const title = request.body.dbName;

    try {
  // Notion API request!
      const newDb = await notion.databases.create({
        parent: {
          type: "page_id",
          page_id: pageId,
        },
        title: [
          {
            type: "text",
            text: {
              content: title,
            },
          },
        ],
        properties: {
          Name: {
            title: {},
          },
        },
      });
      response.json({ message: "success!", data: newDb });
    } catch (error) {
      response.json({ message: "error", error });
    }
  });
  ```
</CodeGroup>

`app.post()` indicates this endpoint is for POST requests, and the first argument (`"/databases"`) indicates this function corresponds to requests made to the `/databases` path, as we did in our client-side code above.

Next, we can actually interact with the Notion API.

To create a new database, we’ll use the [Create a database](/reference/create-a-database) endpoint:

<CodeGroup>
  ```jsx TypeScript theme={null}
  await notion.databases.create({...options})
  ```
</CodeGroup>

To use this endpoint, we need to pass the parent page ID in the body parameters. This page ID is the one already set in the environment variables. The page ID **must** be included in this request.

<CodeGroup>
  ```jsx TypeScript theme={null}
  const pageId = process.env.NOTION_PAGE_ID;
  ...
  try {
    const newDb = await notion.databases.create({
      parent: {
        type: "page_id",
        page_id: pageId,
      },
      ...
  ```
</CodeGroup>

(Note: Environment variables can only be accessed in `server.js` , not `client.js`.)

In this example, the title of the database should also be set. The title was provided in the form the user submitted, which we can access from the request’s body (`request.body.dbName`).

<CodeGroup>
  ```jsx TypeScript theme={null}
  const pageId = process.env.NOTION_PAGE_ID;
  const title = request.body.dbName; // Get the user's title

  try {
    const newDb = await notion.databases.create({
      parent: {...},
      title: [
        {
          type: "text",
          text: {
            content: title, // Include the user's title in the request
          },
        },
      ],
      // ...
  ```
</CodeGroup>

Finally, we need to describe the [database’s properties](/reference/property-object). The properties represent the columns in a database (or the “schema”, depending on which terminology you prefer.)

In this case, our database will have just one column called “Name”, which will represent the page names of its child pages:

<CodeGroup>
  ```jsx TypeScript theme={null}
  try {
      const newDb = await notion.databases.create({
        parent: {...},
        title: [...],
        properties: {
          Name: {
            title: {},
          },
        },
      })
  ...
  ```
</CodeGroup>

Finally, assuming the request works, we can return the response from Notion’s API back to our original fetch request in `client.js`:

<CodeGroup>
  ```jsx JavaScript theme={null}
  ...
  response.json({ message: "success!", data: newDb });
  ```
</CodeGroup>

If it doesn’t work, we’ll return whatever error message we get from Notion’s API:

<CodeGroup>
  ```jsx JavaScript theme={null}
  try {
  ...
  } catch (error) {
    response.json({ message: "error", error });
  }
  ```
</CodeGroup>

Now that we have our new database, the response can be added to the HTML document via the client-side JavaScript (`client.js`).

### Step 5 - Displaying the response (`index.html`)

Let’s first look at an example of the object the `/databases` endpoint responds with, which includes the [object]() that gets returned from the Notion API when we create a new database:

<CodeGroup>
  ```json Response expandable theme={null}
  {
    message: "success!",
    data: { // from Notion
      object: "database",
      id: "e604f78c-4145-4444-b7d5-1adea4fa5d08",
      cover: null,
      icon: null,
      created_time: "2023-07-18T20:56:00.000Z",
      created_by: { object: "user", id: "44b170f0-16ac-47cf-aaaa-8f2eab66hhhh" },
      last_edited_by: {
        object: "user",
        id: "44b170f0-16ac-47cf-gggg-8f2eab6rrrra",
      },
      last_edited_time: "2023-07-18T20:56:00.000Z",
      title: [
        {
          type: "text",
          text: [Object],
          annotations: [Object],
          plain_text: "test db",
          href: null,
        },
      ],
      description: [],
      is_inline: false,
      properties: {
        Name: { id: "title", name: "Name", type: "title", title: {} },
      },
      parent: {
        type: "page_id",
        page_id: "e7261079-9d30-4313-9999-14b29880gggg",
      },
      url: "<https://www.notion.so/e604f78c414548c6b7d51adea4fadddd>",
      public_url: null,
      archived: false,
      in_trash: false
    },
  }
  ```
</CodeGroup>

The most important information here (for our purposes) is the database ID (`data.id`). The ID will be required to make API requests to the [Create a page](/reference/post-page) endpoint, which is the next form in our completed demo’s UI.

Knowing this JSON structure, let’s now look at how `appendApiResponse()` works:

<CodeGroup>
  ```jsx JSX expandable theme={null}
  const dbForm = document.getElementById("databaseForm");
  // Empty table cell where we'll display the API response
  const dbResponse = document.getElementById("dbResponse");
  ...

  // Appends the API response to the UI
  const appendApiResponse = function (apiResponse, el) {
    // Add success message to UI
    const newParagraphSuccessMsg = document.createElement("p")
    newParagraphSuccessMsg.innerHTML = "Result: " + apiResponse.message
    el.appendChild(newParagraphSuccessMsg)

    // See browser console for more information if there's an error
    if (apiResponse.message === "error") return

    // Add ID of Notion item (db, page, comment) to UI
    const newParagraphId = document.createElement("p")
    newParagraphId.innerHTML = "ID: " + apiResponse.data.id
    el.appendChild(newParagraphId)

    // Add URL of Notion item (db, page) to UI
    if (apiResponse.data.url) {
      const newAnchorTag = document.createElement("a")
      newAnchorTag.setAttribute("href", apiResponse.data.url)
      newAnchorTag.innerText = apiResponse.data.url
      el.appendChild(newAnchorTag)
    }
  }
  ```
</CodeGroup>

`appendApiResponse(res, form)` accepts two parameters: the response (shown above) and the HTML element where we will append the response — in this case, an empty table cell next to the database form.

In this function, we first add a paragraph element to show the response message (i.e., whether it was a success or the error).

<CodeGroup>
  ```jsx JSX theme={null}
  const newParagraphSuccessMsg = document.createElement("p")
  newParagraphSuccessMsg.innerHTML = "Result: " + apiResponse.message
  el.appendChild(newParagraphSuccessMsg)
  ```
</CodeGroup>

Then, we do the same with the database ID after confirming the response was not an error:

<CodeGroup>
  ```jsx JSX theme={null}
  if (apiResponse.message === "error") return

  // Add ID of database and data source to UI
  const newParagraphId = document.createElement("p")
  newParagraphId.innerHTML = "Database ID: " + \
    apiResponse.data.id + "; Data Source ID" + apiResponse.data.data_sources[0].id
  el.appendChild(newParagraphId)
  ```
</CodeGroup>

Finally, if the response has a URL, we display that too with an anchor (`<a>`) tag. This allows the user to visit the database directly in Notion.

<CodeGroup>
  ```jsx JSX theme={null}
  if (apiResponse.data.url) {
    const newAnchorTag = document.createElement("a")
    newAnchorTag.setAttribute("href", apiResponse.data.url)
    newAnchorTag.innerText = apiResponse.data.url
    el.appendChild(newAnchorTag)
  }
  ```
</CodeGroup>

(Note: This function will be reused by other forms. Not all responses have a `url` property, which is why we check for it.)

Once this is done, our HTML document is updated and the form submission is officially complete.

## Testing the feature

Let’s see the final results of testing this new feature:

<Frame caption="Submitting the database form and visiting the Notion URL from the response.">
  <img src="https://mintcdn.com/notion-demo/kSI9TVzPayvF1_1o/images/docs/e58e2ed-newdb.gif?s=670a791d2d796cb242a446acf1d46896" data-og-width="600" width="600" data-og-height="482" height="482" data-path="images/docs/e58e2ed-newdb.gif" data-optimize="true" data-opv="3" />
</Frame>

The database form is submitted and the response from Notion's API is appended to our UI. 🎉 We can click the link to visit the new database in Notion and confirm it worked as expected.

As a next step, the new database ID can be copy and pasted into the page form below it to create a new page in the database. We can also use the page ID that the page form returns to add content to the page or comment on it using the block and comment forms.

We won’t cover the code for page, blocks, or comment forms here, but the code is all included in the [source code](https://github.com/makenotion/notion-cookbook/blob/main/examples/javascript/web-form-with-express/views/index.html) for reference. It works the same as the database example.

As a next step, you could also try adding a feature to [retrieve all existing pages](/reference/query-a-data-source) in the database, or [retrieve block children](/reference/get-block-children) (i.e., page content) for an existing page.

## Wrapping up

This guide demonstrated how to use Notion’s public API (via the [Notion SDK for JavaScript](https://github.com/makenotion/notion-sdk-js)) to build an internal integration. With this demo app, users can programmatically create a new database in their Notion workspace by filling out a form in the app UI and making a request to Notion’s public API — the [Create a database](/reference/create-a-database) endpoint.

As a reminder, this example includes client-side code to allow for user interactions via a GUI (graphical user interface). Notion integrations do not require a UI, however. What you build is completely up to you!

To see examples of server-side-only integrations, test out the sample apps in the SDK’s [GitHub repo](https://github.com/makenotion/notion-cookbook/tree/main/examples/javascript).

## Next steps

To learn more about authorizing API requests or to learn how to add an auth flow to your public integration, read the [Authorization guide](/guides/get-started/authorization) next.

### Additional resources

<CardGroup cols={2}>
  <Card title="Reference documentation" icon="code-simple" href="/reference/intro" horizontal color="#0076d7" />

  <Card title="JavaScript client" icon="js" href="https://github.com/makenotion/notion-sdk-js" horizontal color="#0076d7" />

  <Card title="Postman collection" icon="box" href="https://www.postman.com/notionhq/" horizontal color="#0076d7" />

  <Card title="TypeScript starter template" icon="code" href="https://github.com/makenotion/notion-sdk-typescript-starter" horizontal color="#0076d7" />

  <Card title="FAQs" icon="circle-question" href="/page/frequently-asked-questions" horizontal color="#0076d7" />

  <Card title="Slack developer community" icon="slack" href="https://join.slack.com/t/notiondevs/shared_invite/zt-20b5996xv-DzJdLiympy6jP0GGzu3AMg" horizontal color="#0076d7" />
</CardGroup>

---

> ## Documentation Index
> Fetch the complete documentation index at: https://developers.notion.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Authorization

> This guide describes the authorization flows for internal and public Notion integrations.

export const integrationsDashboardUrl = "https://www.notion.so/profile/integrations";

## What is authorization?

Authorization is the process of granting an integration access to a user’s Notion data. That process varies depending on whether or not the integration is **public** or **internal**.

<Check>
  [Link Preview integrations](/guides/link-previews/link-previews) — a subcategory of public integrations — use two-way OAuth, which differs from the authorization flow described in this guide.

  See the [Build a Link Preview integration guide](/guides/link-previews/build-a-link-preview-integration) to learn more about Link Preview authorization.
</Check>

### What is an internal integration?

An internal integration allows Notion workspace members to interact with the workspace through the Notion REST API. Each internal integration is tied to a single, specific workspace and only members within the workspace can use the integration. After an internal integration is added to a workspace, members must manually [give the integration access to the specific pages or databases](https://www.notion.so/help/add-and-manage-connections-with-the-api#add-connections-to-pages) that they want it to use.

### What is a public integration?

Public integrations can be used by any Notion user in any workspace. They allow members to interact with their workspace using Notion’s REST API once the integration has been properly authorized.

Public integrations follow the [OAuth 2.0](https://oauth.net/2/) protocol. This allows workspace members to give access to Notion pages directly through the auth flow, without having to open each Notion workspace page directly and manually give permission to the integration. (More on this below.)

Public integrations can technically be used without permitting workspace pages access as long as the auth flow is completed and an [access token is created](/reference/create-a-token) — a process which will be described in detail below. For example, if a public integration *only* needs to interact with the Notion [User endpoints](/reference/get-users), it does not need to be given access to workspace pages.

For more details on the differences between public and internal integrations, refer to the [getting started](/guides/get-started/getting-started#internal-vs-public-integrations) page.

Read on to learn how to set up the auth flows for internal and public integrations.

## Internal integration auth flow set-up

To use an internal integration, start by creating your integration in the <a href={integrationsDashboardUrl}>integration's settings page</a>.

The internal integration will be associated with the workspace of your choice. You are required to be a workspace owner to create an integration.

<Frame caption="Click the New integration button on the My integrations page to create a new integration.">
  <img src="https://mintcdn.com/notion-demo/kSI9TVzPayvF1_1o/images/docs/fd25d1f-integrations_7.png?fit=max&auto=format&n=kSI9TVzPayvF1_1o&q=85&s=6fcebc5334c9c3499b58208b91b798ae" data-og-width="1198" width="1198" data-og-height="699" height="699" data-path="images/docs/fd25d1f-integrations_7.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/notion-demo/kSI9TVzPayvF1_1o/images/docs/fd25d1f-integrations_7.png?w=280&fit=max&auto=format&n=kSI9TVzPayvF1_1o&q=85&s=cb7c51998785b7c2f88f11658014be5f 280w, https://mintcdn.com/notion-demo/kSI9TVzPayvF1_1o/images/docs/fd25d1f-integrations_7.png?w=560&fit=max&auto=format&n=kSI9TVzPayvF1_1o&q=85&s=c1a92ab2d5c7413c6d73c288ed84246b 560w, https://mintcdn.com/notion-demo/kSI9TVzPayvF1_1o/images/docs/fd25d1f-integrations_7.png?w=840&fit=max&auto=format&n=kSI9TVzPayvF1_1o&q=85&s=49f8e846a3495e9674129bdbbd4a51c8 840w, https://mintcdn.com/notion-demo/kSI9TVzPayvF1_1o/images/docs/fd25d1f-integrations_7.png?w=1100&fit=max&auto=format&n=kSI9TVzPayvF1_1o&q=85&s=5638368c0a7c3e876d0945aee50d8f26 1100w, https://mintcdn.com/notion-demo/kSI9TVzPayvF1_1o/images/docs/fd25d1f-integrations_7.png?w=1650&fit=max&auto=format&n=kSI9TVzPayvF1_1o&q=85&s=aeba43b917d31cb847d5c044ccc83627 1650w, https://mintcdn.com/notion-demo/kSI9TVzPayvF1_1o/images/docs/fd25d1f-integrations_7.png?w=2500&fit=max&auto=format&n=kSI9TVzPayvF1_1o&q=85&s=a3d54f2aa4e0405039a9a88ac58733db 2500w" />
</Frame>

Once the integration is created, you can update its settings as needed under the `Configuration` tab and retrieve the integration token in this tab.

The integration token will be used to authenticate REST API requests. The integration sends the same token in every API request.

<Frame caption="Find the integration token in the integration's settings.">
  <img src="https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/69c7487-integrations_8.png?fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=34d293a88ef5911ff43aefe4dde91e2d" data-og-width="1198" width="1198" data-og-height="699" height="699" data-path="images/docs/69c7487-integrations_8.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/69c7487-integrations_8.png?w=280&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=9af91249ad204650765be96b857ab205 280w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/69c7487-integrations_8.png?w=560&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=db81a6d3d2f63dcffaba7bc3a004f38e 560w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/69c7487-integrations_8.png?w=840&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=bdc99c1625bd6e736addf812ff924d98 840w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/69c7487-integrations_8.png?w=1100&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=2c859481c58b6b96aa82ae1354373c81 1100w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/69c7487-integrations_8.png?w=1650&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=147a15fb10f97a9601b754da8d71d45c 1650w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/69c7487-integrations_8.png?w=2500&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=2cfdc4db42a0f68849cefb49df7d7b84 2500w" />
</Frame>

### Integration permissions

Before an integration can interact with your Notion workspace page(s), the page must be manually shared with the integration. To share a page with an integration, visit the page in your Notion workspace, click the ••• menu at the top right of a page, scroll down to `Add connections`, and use the search bar to find and select the integration from the dropdown list.

Once the integration is shared, you can start making API requests. If the page is not shared, any API requests made will respond with an error.

<Warning>
  **Keep your token secret**

  Your integration token is a secret. To keep your integration secure, never store the token in your source code or commit it in version control. Instead, read the token from an environment variable. Use a secret manager or deployment system to set the token in the environment.

  [Learn more: Best Practices for Handling API Keys](/guides/resources/best-practices-for-handling-api-keys)
</Warning>

### Making API requests with an internal integration

Any time your integration is interacting with your workspace, you will need to include the integration token in the `Authorization` header with every API request. However, if you are using Notion’s [SDK for JavaScript](https://github.com/makenotion/notion-sdk-js) to interact with the REST API, the token is set once when a client is initialized.

<CodeGroup>
  ```http HTTP theme={null}
  GET /v1/pages/b55c9c91-384d-452b-81db-d1ef79372b75 HTTP/1.1
  Authorization: Bearer {INTEGRATION_TOKEN}
  ```
</CodeGroup>

<CodeGroup>
  ```javascript JavaScript theme={null}
  const { Client } = require("@notionhq/client")

  // Initializing a client
  const notion = new Client({
  	auth: process.env.NOTION_TOKEN,
  })

  const getUsers = async () => {
  	const listUsersResponse = await notion.users.list({})
  }
  ```
</CodeGroup>

<Note>
  If you are not using the [Notion SDK for JavaScript](https://github.com/makenotion/notion-sdk-js), you will also need to set the [`Notion-Version`](/reference/versioning) and [`Content-type`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) headers in all of in your requests, like so:

  ```json JSON theme={null}
  headers: {
    Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json",
  },
  ```
</Note>

If you receive an error response from the API, check if the integration has been properly [added to the page](https://www.notion.so/help/add-and-manage-connections-with-the-api#manage-connections-in-your-workspace). If this does not solve the problem, refer to our [Status codes](/reference/status-codes) page for more information.

## Public integration auth flow set-up

When an integration is made public, any Notion user in any workspace can use it.

Since a public integration is not tied to a single workspace with a single integration token, public integrations instead follow the [OAuth 2.0 protocol](https://oauth.net/2/) to authorize an integration to interact with a workspace.

### How to make a public integration

Select `New Integration` in your integration dashboard and select `Public` in the integration *Type* during the creation flow. You may also edit an existing internal integration to convert to `Public`.

<Frame caption="Public integration example.">
  <img src="https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/736d786-integrations_9.png?fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=024e202e05d5317ecec829b862ae99a8" data-og-width="1198" width="1198" data-og-height="699" height="699" data-path="images/docs/736d786-integrations_9.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/736d786-integrations_9.png?w=280&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=b1b8e617d40df2b9fd8821dabe9061e2 280w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/736d786-integrations_9.png?w=560&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=159c0107e279098fbc94607ff4999f41 560w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/736d786-integrations_9.png?w=840&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=3598e8b2927ccf3b9ac0cfd9228a1f07 840w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/736d786-integrations_9.png?w=1100&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=809c08de34d84fc8c91237dddbe12fcc 1100w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/736d786-integrations_9.png?w=1650&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=e0fe93fd0e7dbddeb59d8b89f3f6d387 1650w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/736d786-integrations_9.png?w=2500&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=b06a71d1e6c21bdb0d36b76269738958 2500w" />
</Frame>

You will need to fill out the form with additional information, including your company name, website, and redirect URI(s).

The redirect URI is the URI your users will be redirected to after authorizing the public integration. To learn more, read [OAuth’s description of redirect URIs](https://www.oauth.com/oauth2-servers/redirect-uris/).

### Public integration authorization overview

Once your integration has been made public, you can update your integration code to use the public auth flow.

As an overview, the authorization flow includes the following steps. Each step will be described in more detail below.

<Steps>
  <Step>
    Navigate the user to the integration’s authorization URL. This URL is provided in the <a href={integrationsDashboardUrl}>integration's settings page</a>.
  </Step>

  <Step>
    After the user selects which workspace pages to share, Notion redirects the user to the integration’s redirect URI and includes a `code` query parameter. The redirect URI is the one you specified in your <a href={integrationsDashboardUrl}>integration's settings page</a>.
  </Step>

  <Step>
    You will make a `POST` request to [create an access token](/reference/create-a-token) , which will exchange the temporary `code` for an access token.
  </Step>

  <Step>
    The Notion API responds with an access token and some additional information.
  </Step>

  <Step>
    You will store the access token for future API requests. View the [API reference docs](/reference/intro) to learn about available endpoints.
  </Step>
</Steps>

### Step 1 - Navigate the user to the integration’s authorization URL

After your integration has been successfully made public in your <a href={integrationsDashboardUrl}>integration's settings page</a>, you will be able to access the integration’s secrets in the **Configuration** tab. Similarly to the internal integrations, these values should be protected and should never be included in source code or version control.

<Frame caption="The Authorization URL field populates after a public integration is submitted">
  <img src="https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/c535461-integrations_10.png?fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=ef1174a58a78b04444bea74627ede083" data-og-width="1198" width="1198" data-og-height="699" height="699" data-path="images/docs/c535461-integrations_10.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/c535461-integrations_10.png?w=280&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=b587242b941365656c64f99cd8dc05c9 280w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/c535461-integrations_10.png?w=560&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=c708c30297ae6dee382a5836780b710a 560w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/c535461-integrations_10.png?w=840&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=834150052e2989bfbad4269265035aec 840w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/c535461-integrations_10.png?w=1100&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=3dd55465b81829d22d8c5f524f513f97 1100w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/c535461-integrations_10.png?w=1650&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=cfcd4563c2f383bf6215228f72a6ea82 1650w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/c535461-integrations_10.png?w=2500&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=9ed48b65c760339590d3eecb6299ee23 2500w" />
</Frame>

As an example, your `.env` file using these secrets could look like this:

<CodeGroup>
  ```shell Shell theme={null}
  #.env

  OAUTH_CLIENT_ID=<your-client-id>
  OAUTH_CLIENT_SECRET=<your-client-secret>
  NOTION_AUTH_URL=<your-auth-url>
  ```
</CodeGroup>

To start the authorization flow for a public integration, you need to direct the prospective user to the authorization URL. To do this, it is common to include a hyperlink in the integration app that will be interacting with the Notion REST API. For example, if you have an app that will allow users to create new Notion pages for their workspace(s), you will first need them to first visit the authorization URL by clicking on the link.

The following example shows an authorization URL made available through a hyperlink:

<CodeGroup>
  ```html HTML theme={null}
  <a href="https://api.notion.com/v1/oauth/authorize?owner=user&client_id=463558a3-725e-4f37-b6d3-0889894f68de&redirect_uri=https%3A%2F%2Fexample.com%2Fauth%2Fnotion%2Fcallback&response_type=code">Add to Notion</a>
  ```
</CodeGroup>

The URL begins with `https://api.notion.com/v1/oauth/authorize` and has the following parameters:

| Parameter       | Description                                                                                                                                                                         | Required |
| :-------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- |
| `client_id`     | An identifier for your integration, found in the integration settings.                                                                                                              | ✅        |
| `redirect_uri`  | The URL where the user should return after granting access.                                                                                                                         | ✅        |
| `response_type` | Always use `code`.                                                                                                                                                                  | ✅        |
| `owner`         | Always use `user`.                                                                                                                                                                  | ✅        |
| `state`         | If the user was in the middle of an interaction or operation, then this parameter can be used to restore state after the user returns. It can also be used to prevent CSRF attacks. |          |

Once the authorization URL is visited, the user will be shown a prompt that varies depending on whether or not the integration comes with a Notion template option.

#### Prompt for a standard integration with no template option (Default)

In the standard integration permissions flow, a prompt describes the integration [capabilities](/reference/capabilities), presented to the user as what the integration would like to be able to do in the workspace. A user can either select pages to grant the integration access to, or cancel the request.

<Frame caption="Prompt for authorizing a standard integration (no template option)">
  <img src="https://mintcdn.com/notion-demo/kSI9TVzPayvF1_1o/images/docs/ec39f97-Screen_Shot_2021-07-22_at_2.58.28_PM.png?fit=max&auto=format&n=kSI9TVzPayvF1_1o&q=85&s=3a82bcb02f006753164c1334e664b500" data-og-width="1150" width="1150" data-og-height="1390" height="1390" data-path="images/docs/ec39f97-Screen_Shot_2021-07-22_at_2.58.28_PM.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/notion-demo/kSI9TVzPayvF1_1o/images/docs/ec39f97-Screen_Shot_2021-07-22_at_2.58.28_PM.png?w=280&fit=max&auto=format&n=kSI9TVzPayvF1_1o&q=85&s=cd5de5a9df445d715557662788dff7c2 280w, https://mintcdn.com/notion-demo/kSI9TVzPayvF1_1o/images/docs/ec39f97-Screen_Shot_2021-07-22_at_2.58.28_PM.png?w=560&fit=max&auto=format&n=kSI9TVzPayvF1_1o&q=85&s=4170a3824ecac3fe95e9976e50262bd4 560w, https://mintcdn.com/notion-demo/kSI9TVzPayvF1_1o/images/docs/ec39f97-Screen_Shot_2021-07-22_at_2.58.28_PM.png?w=840&fit=max&auto=format&n=kSI9TVzPayvF1_1o&q=85&s=46ae6c59a3fccd09b03adf828f73c443 840w, https://mintcdn.com/notion-demo/kSI9TVzPayvF1_1o/images/docs/ec39f97-Screen_Shot_2021-07-22_at_2.58.28_PM.png?w=1100&fit=max&auto=format&n=kSI9TVzPayvF1_1o&q=85&s=f57ba2fdb324aa186b87c35aa7e1578b 1100w, https://mintcdn.com/notion-demo/kSI9TVzPayvF1_1o/images/docs/ec39f97-Screen_Shot_2021-07-22_at_2.58.28_PM.png?w=1650&fit=max&auto=format&n=kSI9TVzPayvF1_1o&q=85&s=323a920f9883c9b89c689e6566e16b59 1650w, https://mintcdn.com/notion-demo/kSI9TVzPayvF1_1o/images/docs/ec39f97-Screen_Shot_2021-07-22_at_2.58.28_PM.png?w=2500&fit=max&auto=format&n=kSI9TVzPayvF1_1o&q=85&s=18cb8d57b8f8093555222f83699a700a 2500w" />
</Frame>

If the user presses **Cancel**, they will be redirected to the redirect URI with and `error` query param added.

```
www.example.com/my-redirect-uri?error=access_denied&state=
```

You can use this `error`query parameter to conditionally update your app’s state as needed.

If the user opts to `Select pages`, then a page picker interface opens. A user can search for and select pages and databases to share with the integration from the page picker.

<Note>
  The page picker only displays pages or databases to which a user has [full access](https://www.notion.so/help/sharing-and-permissions), because a user needs full access to a resource in order to be able to share it with an integration.
</Note>

<Frame caption="Page picker interface">
  <img src="https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/a4009ce-Screen_Shot_2021-07-22_at_3.09.51_PM.png?fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=94186f31f22938dc1c7d850e227e061a" data-og-width="1142" width="1142" data-og-height="1360" height="1360" data-path="images/docs/a4009ce-Screen_Shot_2021-07-22_at_3.09.51_PM.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/a4009ce-Screen_Shot_2021-07-22_at_3.09.51_PM.png?w=280&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=aa81f9caa71de44fc783ac9feaf274c7 280w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/a4009ce-Screen_Shot_2021-07-22_at_3.09.51_PM.png?w=560&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=1c80e906ecb1e3e9275cc7adb4ac9915 560w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/a4009ce-Screen_Shot_2021-07-22_at_3.09.51_PM.png?w=840&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=aebe6c8ce0d2f78e9d7000e730c0e39e 840w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/a4009ce-Screen_Shot_2021-07-22_at_3.09.51_PM.png?w=1100&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=1270ef1211d503f45845ed49d3197836 1100w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/a4009ce-Screen_Shot_2021-07-22_at_3.09.51_PM.png?w=1650&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=83baa449920559a120ca03b4d5f8cbdb 1650w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/a4009ce-Screen_Shot_2021-07-22_at_3.09.51_PM.png?w=2500&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=d8b29f9d96747e4e91e2a5608f611a1f 2500w" />
</Frame>

Users can select which pages to give the integration access to, including both private and public pages available to them. Parent pages can be selected to quickly provide access to child pages, as giving access to a parent page will provide access to all available child pages. Users can return to this view at a later time to update access settings if circumstances change.

If the user clicks `Allow access`, they are then redirected to the `redirect_uri` with a temporary authorization `code`. If the user denies access, they are redirected to the `redirect_uri` with an `error` query parameter.

If the user clicks `Allow access` and the rest of the auth flow is not completed, the integration will *not* have access to the pages that were selected.

#### Prompt for an integration with a Notion template option

Public integrations offer the option of providing a public Notion page to use as a template during the auth flow.

To add a template to your workspace, complete the following steps:

* Choose a public page in your workspace that you want users to be able to duplicate.
* Navigate to your <a href={integrationsDashboardUrl}>integration's settings</a> and go to the **Basic Information** tab.
* Scroll to the bottom of your distribution settings and add the URL of the Notion page you selected to the **Notion URL for optional template** input.

<Frame caption="Notion URL for optional template input in integration settings.">
  <img src="https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/b4ae671-integrations11.png?fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=d83bd80077b7fb6bdab6c38cbadb6579" data-og-width="1198" width="1198" data-og-height="699" height="699" data-path="images/docs/b4ae671-integrations11.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/b4ae671-integrations11.png?w=280&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=a5d2e397a2888aae9d0b3a20a6ab3a57 280w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/b4ae671-integrations11.png?w=560&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=39ca4045f429cb85c91546e0c1e0fecf 560w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/b4ae671-integrations11.png?w=840&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=9cdf90494f856ce84fab433445005dc3 840w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/b4ae671-integrations11.png?w=1100&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=3c3356f04b32cb39e7c3c6891419f945 1100w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/b4ae671-integrations11.png?w=1650&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=45683f06ef94b549f0bb5f03e6b59862 1650w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/b4ae671-integrations11.png?w=2500&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=f5cd7e893edd0864dc2aaaaef09cc031 2500w" />
</Frame>

Once this URL is added, your auth flow prompt appearance will be updated.

Going back to your prompt view, if the integration offers a Notion template option, the first step in the permissions flow will describe the integration [capabilities](/reference/capabilities). This is presented to the user as what the integration would be able to do in the workspace, and it prompts the user to click `Next`.

<Frame caption="Prompt for an integration with a Notion template option">
  <img src="https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/77076c7-template_prompt1.png?fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=bce36d9f1a69a618dc886d1baf46d50f" data-og-width="1102" width="1102" data-og-height="1462" height="1462" data-path="images/docs/77076c7-template_prompt1.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/77076c7-template_prompt1.png?w=280&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=6ddc1e0e9c726f155c7bac0a0fe0bed0 280w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/77076c7-template_prompt1.png?w=560&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=a1ae1eb9f748c32af5e88111d45d1af1 560w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/77076c7-template_prompt1.png?w=840&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=3af09c117c8a03d74983a9c55cded60c 840w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/77076c7-template_prompt1.png?w=1100&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=73e048e5cf0e2520cf8e218d4763ecd8 1100w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/77076c7-template_prompt1.png?w=1650&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=56472acfdbdfe57e8e8ede6abee82048 1650w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/77076c7-template_prompt1.png?w=2500&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=885dc89b073e5019cd12152a24e45550 2500w" />
</Frame>

In the next step, a user can either choose to duplicate the template that you provided or to select existing pages to share with the integration.

<Frame caption="A user can select to duplicate a template or to share existing pages with the integration">
  <img src="https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/9788bdb-template_prompt_2.png?fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=d5ff31ef9083f78b60e615758b6f580e" data-og-width="1052" width="1052" data-og-height="1546" height="1546" data-path="images/docs/9788bdb-template_prompt_2.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/9788bdb-template_prompt_2.png?w=280&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=d0bcebf97c2d2d47298b5eb3ed8e9667 280w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/9788bdb-template_prompt_2.png?w=560&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=0df02c964b4ba61b341057ce4ca2b7c1 560w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/9788bdb-template_prompt_2.png?w=840&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=edf55877ba383f2192ad830326ca6885 840w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/9788bdb-template_prompt_2.png?w=1100&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=c236950de91a26a9329f68e904b29565 1100w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/9788bdb-template_prompt_2.png?w=1650&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=ad655a24827c812ebed25fc3e3a7edd6 1650w, https://mintcdn.com/notion-demo/9OFhQspLr8njnajd/images/docs/9788bdb-template_prompt_2.png?w=2500&fit=max&auto=format&n=9OFhQspLr8njnajd&q=85&s=2ca3fc12da1dc649db7f8128100996bf 2500w" />
</Frame>

If the user chooses to duplicate the template, then the following happens automatically:

* The integration is added to the user’s workspace.
* The template is duplicated as a new page in the workspace.
* The new page is shared with the integration.

If the user chooses to select pages to share with the integration, then they continue to the page picker interface that’s part of the [prompt for a standard integration](#prompt-for-a-standard-integration-with-no-template-option-default).

<Note>
  After a user installs a public integration, only that user is able to interact or share pages and databases with the integration. Unlike internal integrations, if multiple members in a workspace want to use a public integration, each prospective user needs to individually follow the auth flow for the integration.
</Note>

**User authorization failures**

User authorization failures can happen. If a user chooses to `Cancel` the request, then a failure is triggered. Build your integration to handle these cases gracefully, as needed.

In some cases, Notion redirects the user to the `redirect_uri` that you set up when you created the public integration, along with an `error` query parameter. Notion uses the common [error codes in the OAuth specification](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1). Use the `error` code to create a helpful prompt for the user when they’re redirected here.

### Step 2 - Notion redirects the user to the integration’s redirect URI and includes a `code` parameter

When you first created the public integration, you specified a redirect URI. If the user follows the prompt to `Allow access` for the integration, then Notion generates a temporary `code` and sends a request to the redirect URI with the following information in the query string:

| Parameter | Description                                                                                                                                        | Required |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------- | :------- |
| `code`    | A temporary authorization code.                                                                                                                    | ✅        |
| `state`   | The value provided by the integration when the user was [prompted for access](#prompt-for-a-standard-integration-with-no-template-option-default). |          |

To complete the next set, you will need to retrieve the `code` query parameter provided in the redirect. How you retrieve this value will vary depending on your app’s tech stack.

In a React component, for example, the query parameters are made available through the `useRouter()` hook:

<CodeGroup>
  ```javascript JavaScript theme={null}
  export default function AuthRedirectPage() {
    const router = useRouter();
    const { code } = router.query;
    ...
  }
  ```
</CodeGroup>

### Step 3 - Send the `code` in a `POST` request to the Notion API

The integration needs to exchange the temporary `code` for an `access_token`.

To set up this step, retrieve the `code` from the redirect URI.

Next, you will need to send the `code` as part of a `POST` request to Notion’s token endpoint: [https://api.notion.com/v1/oauth/token](https://api.notion.com/v1/oauth/token).

This endpoint is described in more detail in the API reference docs for [creating a token](/reference/create-a-token).

The request is authorized using HTTP Basic Authentication. The credential is a colon-delimited combination of the integration’s `CLIENT_ID` and `CLIENT_SECRET`, like so:

```bash  theme={null}
CLIENT_ID:CLIENT_SECRET
```

You can find both of these values in the <a href={integrationsDashboardUrl}>integration's settings</a>.

Note that in [HTTP Basic Authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication), credentials are `base64` encoded before being added to the `Authorization` header.

The body of the request contains the following JSON-encoded fields:

| Field            | Type     | Description                                                                                | Required                                                                                                                                                                                                                                                                                                                            |
| :--------------- | :------- | :----------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"grant_type"`   | `string` | Always use `"authorization_code"`.                                                         | ✅                                                                                                                                                                                                                                                                                                                                   |
| `"code"`         | `string` | The temporary authorization code received in the incoming request to the `"redirect_uri"`. | ✅                                                                                                                                                                                                                                                                                                                                   |
| `"redirect_uri"` | `string` | The `"redirect_uri"` that was provided in the Authorization step.                          | ✅/❌\* <br /><br /> \* If the redirect URI was supplied as a query param in the Authorization URL, this field is required. If there are more than one redirect URIs included in your integration settings, this field is required. Otherwise, it is not allowed. Learn more in the [Create a token page](/reference/create-a-token). |

The following is an example request to exchange the authorization code for an access token:

<CodeGroup>
  ```http HTTP theme={null}
  POST /v1/oauth/token HTTP/1.1
  Authorization: Basic "$CLIENT_ID:$CLIENT_SECRET"
  Content-Type: application/json

  {"grant_type":"authorization_code","code":"e202e8c9-0990-40af-855f-ff8f872b1ec6", "redirect_uri":"https://example.com/auth/notion/callback"}
  ```
</CodeGroup>

The Node-equivalent of this example would look something like this:

<CodeGroup>
  ```javascript JavaScript theme={null}
  ...
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  const redirectUri = process.env.OAUTH_REDIRECT_URI;

  // encode in base 64
  const encoded = btoa(`${clientId}:${clientSecret}`);

  const response = await fetch("https://api.notion.com/v1/oauth/token", {
  	method: "POST",
  	headers: {
  	Accept: "application/json",
  	"Content-Type": "application/json",
  	Authorization: `Basic ${encoded}`,
  },
  	body: JSON.stringify({
  		grant_type: "authorization_code",
  		code: "your-temporary-code",
  		redirect_uri: redirectUri,
  	}),
  });
  ...
  ```
</CodeGroup>

### Step 4 - Notion responds with an `access_token` , `refresh_token`, and additional information

Notion responds to the request with an `access_token`, `refresh_token`, and additional information. The `access_token` will be used to authenticate subsequent Notion REST API requests. The `refresh_token` will be used to refresh the access token, which generates a new `access_token`.

The response contains the following JSON-encoded fields:

| Field                      | Type     | Description                                                                                                                                                                                                                                     | Not null |
| :------------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- |
| `"access_token"`           | `string` | An access token used to authorize requests to the Notion API.                                                                                                                                                                                   | ✅        |
| `"refresh_token"`          | `string` | A refresh token used to generate a new access token                                                                                                                                                                                             | ✅        |
| `"bot_id"`                 | `string` | An identifier for this authorization.                                                                                                                                                                                                           | ✅        |
| `"duplicated_template_id"` | `string` | The ID of the new page created in the user’s workspace. The new page is a duplicate of the template that the developer provided with the integration. If the developer didn’t provide a template for the integration, then the value is `null`. |          |
| `"owner"`                  | `object` | An object containing information about who can view and share this integration. `{ "workspace": true }` is returned for installations of workspace-level tokens. For user level tokens, a [user object](/reference/user) is returned.           | ✅        |
| `"workspace_icon"`         | `string` | A URL to an image that can be used to display this authorization in the UI.                                                                                                                                                                     |          |
| `"workspace_id"`           | `string` | The ID of the workspace where this authorization took place.                                                                                                                                                                                    | ✅        |
| `"workspace_name"`         | `string` | A human-readable name that can be used to display this authorization in the UI.                                                                                                                                                                 |          |

**Token request failures**

If something goes wrong when the integration attempts to exchange the `code` for an `access_token`, then the response contains a JSON-encoded body with an `"error"` field. Notion uses the common [error codes from the OAuth specification](https://datatracker.ietf.org/doc/html/rfc6749#section-5.2).

### Step 5 - The integration stores the `access_token` and `refresh_token` for future requests

You need to set up a way for your integration to store both the `access_token` and `refresh_token` that it receives. The `access_token` is used to make authorized requests to the Notion API, and the `refresh_token` is used to generate a new `access_token`.

**Tips for storing and using token access**

* Setting up a database is a typical solution for storing access tokens. If you’re using a database, then build relations between an `access_token`, `refresh_token`, and the corresponding Notion resources that your integration accesses with that token. For example, if you store a Notion database or page ID, relate those records with the correct `access_token` that you use to authorize requests to read or write to that database or page, and the `refresh_token` for ongoing token lifecycle support..
* Store all of the information that your integration receives with the `access_token` and `refresh_token`. You never know when your UI or product requirements might change and you’ll need this data. It's really hard (or impossible) to send users to repeat the authorization flow to generate the information again.
* The `bot_id` returned along with your tokens should act as your primary key when storing information.

### Step 6 - Refreshing an access token

Refreshing an access token will generate a new access token and a new refresh token.

You will need to send the `refresh_token` provided from [Step 4](/guides/get-started/authorization#step-4-notion-responds-with-an-access-token-%2C-refresh-token%2C-and-additional-information) as part of a `POST` request to Notion’s token endpoint: [https://api.notion.com/v1/oauth/token](https://api.notion.com/v1/oauth/token).

This endpoint is described in more detail in the API reference docs for [refreshing a token](/reference/refresh-a-token).

The request is authorized using HTTP Basic Authentication. The credential is a colon-delimited combination of the integration’s `CLIENT_ID` and `CLIENT_SECRET`, like so:

```bash  theme={null}
CLIENT_ID:CLIENT_SECRET
```

You can find both of these values in the <a href={integrationsDashboardUrl}>integration's settings</a>.

Note that in [HTTP Basic Authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication), credentials are `base64` encoded before being added to the `Authorization` header.

The body of the request contains the following JSON-encoded fields:

| Field             | Type     | Description                                               | Required |
| :---------------- | :------- | :-------------------------------------------------------- | :------- |
| `"grant_type"`    | `string` | Always use `"refresh_token"`.                             | ✅        |
| `"refresh_token"` | `string` | The `"refresh_token"` returned in the Authorization step. | ✅        |

The following is an example request to exchange the `refresh_token` for a new access token and new refresh token

<CodeGroup>
  ```http HTTP theme={null}
  POST /v1/oauth/token HTTP/1.1
  Authorization: Basic "$CLIENT_ID:$CLIENT_SECRET"
  Content-Type: application/json

  {"grant_type":"refresh_token","refresh_token":"nrt_4991090011501Ejc6Xn4sHguI7jZIN449mKe9PRhpMfNK"}
  ```
</CodeGroup>

The Node-equivalent of this example would look something like this:

<CodeGroup>
  ```javascript JavaScript theme={null}
  ...
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  // encode in base 64
  const encoded = btoa(`${clientId}:${clientSecret}`);

  const response = await fetch("https://api.notion.com/v1/oauth/token", {
  	method: "POST",
  	headers: {
  	Accept: "application/json",
  	"Content-Type": "application/json",
  	Authorization: `Basic ${encoded}`,
  },
  	body: JSON.stringify({
  		grant_type: "refresh_token",
  		refresh_token: "your-refresh-token",
  	}),
  });
  ...
  ```
</CodeGroup>

---

> ## Documentation Index
> Fetch the complete documentation index at: https://developers.notion.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Notion MCP

> Learn how to connect AI agents to your Notion workspace.

Connect your AI tools to Notion using the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction), an open standard that lets AI assistants interact with your Notion workspace.

## What is Notion MCP?

Notion MCP is our hosted server that gives AI tools secure access to your Notion workspace. It's designed to work seamlessly with popular AI assistants like Claude Code, Cursor, VS Code, ChatGPT, and more.

<Frame caption="High-level diagram of the MCP data flow, where Notion hosts both the MCP Server and [Notion's API](/reference/intro), and your tools contain [MCP clients](/guides/mcp/common-mcp-clients) that connect to the remote MCP server to access our tools.">
  <img src="https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/97125b4c4172e71d0a2293523ebf17424f7fec9fab5852d4b6c0eba2eaa0200d-image.png?fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=d562ef536d8a47c8d67111577be2521b" data-og-width="1346" width="1346" data-og-height="518" height="518" data-path="images/docs/97125b4c4172e71d0a2293523ebf17424f7fec9fab5852d4b6c0eba2eaa0200d-image.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/97125b4c4172e71d0a2293523ebf17424f7fec9fab5852d4b6c0eba2eaa0200d-image.png?w=280&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=af68f7e54780815a317ea56640867e30 280w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/97125b4c4172e71d0a2293523ebf17424f7fec9fab5852d4b6c0eba2eaa0200d-image.png?w=560&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=fe7500dbf7f7ab9ec308277aaedc91b8 560w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/97125b4c4172e71d0a2293523ebf17424f7fec9fab5852d4b6c0eba2eaa0200d-image.png?w=840&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=273a0bdbc24b778126449895a05a5ec5 840w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/97125b4c4172e71d0a2293523ebf17424f7fec9fab5852d4b6c0eba2eaa0200d-image.png?w=1100&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=f82d7dd81aebfff8beebefaf1b840d7d 1100w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/97125b4c4172e71d0a2293523ebf17424f7fec9fab5852d4b6c0eba2eaa0200d-image.png?w=1650&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=08ef721aa44c0b8e7cc210f9338578b2 1650w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/97125b4c4172e71d0a2293523ebf17424f7fec9fab5852d4b6c0eba2eaa0200d-image.png?w=2500&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=0562ea153a312ee88b86f4d023e102d5 2500w" />
</Frame>

### Why use Notion MCP?

* **Easy setup** — Connect through simple OAuth, with one-click installation for supported AI tools
* **Full workspace access** — AI tools can read and write to your Notion pages just like you can
* **Optimized for AI** — Built specifically for AI agents with efficient data formatting

### What can you do with Notion MCP?

* **Create documentation** — Generate PRDs, tech specs, and architecture docs from your research and project data
* **Search and find answers** — Let AI search across all your Notion and connected workspace content
* **Manage tasks** — Generate code snippets from task descriptions and update project status automatically
* **Build reports** — Create release notes, project updates, and performance reports from multiple sources
* **Plan campaigns** — Generate comprehensive briefs and track progress across marketing channels

---

> ## Documentation Index
> Fetch the complete documentation index at: https://developers.notion.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Connecting to Notion MCP

> Learn how to connect your AI tool to Notion using MCP.

This guide walks you through connecting your AI tool to Notion using the Model Context Protocol (MCP). Once connected, your tool can read and write to your Notion workspace based on your access and permissions.

## Claude Code

Run this command in your terminal:

```bash  theme={null}
claude mcp add --transport http notion https://mcp.notion.com/mcp
```

Then authenticate by running `/mcp` in Claude Code and following the OAuth flow.

<Accordion title="Using --scope flag for different installation scopes">
  * `--scope local` (default): Available only to you in the current project
  * `--scope project`: Shared with your team via `.mcp.json` file
  * `--scope user`: Available to you across all projects
</Accordion>

Use the `/mcp` command to list and manage the MCP servers you have installed, and use the `/context` command to understand the context token usage of your current session, including the number of tokens used by each MCP server that's enabled.

<Tip>
  For a richer experience, install the [Notion plugin for Claude Code](https://github.com/makenotion/claude-code-notion-plugin). It bundles the MCP server along with pre-built Skills and slash commands for common Notion workflows.
</Tip>

## Cursor

<Steps>
  <Step>
    Open **Cursor Settings** → **MCP** → **Add new global MCP server**
  </Step>

  <Step>
    Paste the following configuration:

    ```json  theme={null}
    {
      "mcpServers": {
        "notion": {
          "url": "https://mcp.notion.com/mcp"
        }
      }
    }
    ```
  </Step>

  <Step>
    Save and restart Cursor. When you use a Notion tool for the first time, complete the OAuth flow to connect your workspace.
  </Step>
</Steps>

<Accordion title="Project-level configuration">
  To share the Notion MCP configuration with your team, create a `.cursor/mcp.json` file in your project root:

  ```json  theme={null}
  {
    "mcpServers": {
      "notion": {
        "url": "https://mcp.notion.com/mcp"
      }
    }
  }
  ```
</Accordion>

## VS Code (GitHub Copilot)

<Steps>
  <Step>
    Create a `.vscode/mcp.json` file in your workspace:

    ```json  theme={null}
    {
      "servers": {
        "notion": {
          "type": "http",
          "url": "https://mcp.notion.com/mcp"
        }
      }
    }
    ```
  </Step>

  <Step>
    Open the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`) and run **MCP: List Servers**
  </Step>

  <Step>
    Start the Notion server and complete the OAuth flow when prompted
  </Step>
</Steps>

<Accordion title="User-level configuration">
  To configure Notion MCP across all workspaces, run **MCP: Open User Configuration** from the Command Palette and add the server configuration there.
</Accordion>

## Claude Desktop

<Steps>
  <Step>
    Open **Settings** → **Connectors**
  </Step>

  <Step>
    Click **Add Connector** and enter the URL:

    ```
    https://mcp.notion.com/mcp
    ```
  </Step>

  <Step>
    Complete the OAuth flow to connect your Notion workspace
  </Step>
</Steps>

<Note>
  Remote MCP servers in Claude Desktop are configured through Settings → Connectors, not the `claude_desktop_config.json` file. Available on Pro, Max, Team, and Enterprise plans.
</Note>

## Windsurf

<Steps>
  <Step>
    Open **Windsurf Settings** (`Cmd+,` on Mac) → search for **MCP**
  </Step>

  <Step>
    Click **View raw config** to open `mcp_config.json`
  </Step>

  <Step>
    Add the Notion server configuration:

    ```json  theme={null}
    {
      "mcpServers": {
        "notion": {
          "serverUrl": "https://mcp.notion.com/mcp"
        }
      }
    }
    ```
  </Step>

  <Step>
    Save and restart Windsurf. Complete the OAuth flow when prompted.
  </Step>
</Steps>

## ChatGPT

<Steps>
  <Step>
    Go to [chatgpt.com/#settings/Connectors](https://chatgpt.com/#settings/Connectors) (requires login)
  </Step>

  <Step>
    Click **Add Connector** and enter the URL:

    ```
    https://mcp.notion.com/mcp
    ```
  </Step>

  <Step>
    Complete the OAuth flow to connect your Notion workspace
  </Step>
</Steps>

## Other tools

If your AI tool isn't listed above but supports MCP, you can connect using one of these URLs:

| Transport                         | URL                          | Notes                              |
| :-------------------------------- | :--------------------------- | :--------------------------------- |
| **Streamable HTTP** (recommended) | `https://mcp.notion.com/mcp` | Modern transport, widely supported |
| **SSE** (Server-Sent Events)      | `https://mcp.notion.com/sse` | Legacy transport for older clients |

### JSON configuration format

Most MCP clients accept a JSON configuration. Use the appropriate format for your tool:

<CodeGroup>
  ```json Streamable HTTP theme={null}
  {
    "mcpServers": {
      "notion": {
        "url": "https://mcp.notion.com/mcp"
      }
    }
  }
  ```

  ```json SSE theme={null}
  {
    "mcpServers": {
      "notion": {
        "type": "sse",
        "url": "https://mcp.notion.com/sse"
      }
    }
  }
  ```

  ```json STDIO (via mcp-remote) theme={null}
  {
    "mcpServers": {
      "notion": {
        "command": "npx",
        "args": ["-y", "mcp-remote", "https://mcp.notion.com/mcp"]
      }
    }
  }
  ```
</CodeGroup>

Use the STDIO configuration if your tool doesn't support remote HTTP connections directly.

## Connect through the Notion app

As an alternative to configuring your AI tool directly, you can initiate the connection from within Notion:

<Steps>
  <Step>
    Open **Settings** in the Notion app
  </Step>

  <Step>
    Go to **Connections** → **Notion MCP**
  </Step>

  <Step>
    Choose your AI tool from the list and complete the OAuth flow
  </Step>
</Steps>

## Troubleshooting

<AccordionGroup>
  <Accordion title="My tool doesn't support remote MCP servers">
    Some MCP clients only support local stdio servers. You can still connect to Notion MCP using the [mcp-remote](https://www.npmjs.com/package/mcp-remote) bridge:

    ```json  theme={null}
    {
      "mcpServers": {
        "notion": {
          "command": "npx",
          "args": ["-y", "mcp-remote", "https://mcp.notion.com/mcp"]
        }
      }
    }
    ```

    As a last resort, you can run our [open-source MCP server](https://github.com/makenotion/notion-mcp-server) locally, though this package is no longer actively maintained.
  </Accordion>

  <Accordion title="Authentication issues">
    * Make sure you complete the OAuth flow when prompted
    * Try disconnecting and reconnecting: look for a "Clear authentication" or "Disconnect" option in your tool's MCP settings
    * Check that you have the correct permissions in the Notion workspace you're trying to access
  </Accordion>

  <Accordion title="My tool isn't listed here">
    Check your tool's documentation for how to add a remote MCP server. Most tools accept either a URL directly or a JSON configuration. If your tool doesn't support MCP yet, consider reaching out to the developers to request MCP support.
  </Accordion>
</AccordionGroup>

## FAQ

<AccordionGroup>
  <Accordion title="Can I use Notion MCP without a human in the loop?">
    Notion MCP requires user-based OAuth authentication and does not support bearer token authentication. This means a user must complete the OAuth flow to authorize access, which may not be suitable for fully automated workflows or cloud-based coding agents that run without human interaction.

    If you need headless or fully automated access, you can use the [open-source MCP server](https://github.com/makenotion/notion-mcp-server) with a Notion API token, though this package is no longer actively maintained. Notion may explore supporting token-based authentication for remote MCP in the future.

    For [security reasons](/guides/mcp/mcp-security-best-practices), we recommend carefully reviewing actions performed by any MCP server before they're executed.
  </Accordion>

  <Accordion title="Does Notion MCP support file uploads?">
    Image and file uploads are not currently supported in Notion MCP, but this is on our roadmap. In the meantime, you can use the [file upload API](/guides/data-apis/working-with-files-and-media) to upload files such as images and PDFs to your workspace.
  </Accordion>

  <Accordion title="What's the difference between Notion MCP and the open-source server?">
    **Notion MCP** (`https://mcp.notion.com/mcp`) is our hosted, actively maintained server. It uses OAuth for authentication, requires no infrastructure setup, and includes tools optimized for AI agents.

    The **open-source server** ([`notion-mcp-server`](https://github.com/makenotion/notion-mcp-server)) is no longer actively maintained. It supports bearer token authentication and the original JSON-based v1 APIs, which may be useful for automated workflows, but requires you to manage your own integration and deployment.

    For most users, we recommend Notion MCP.
  </Accordion>

  <Accordion title="I'm building my own MCP client">
    If you're integrating Notion MCP into your own application or building a custom AI tool, see our [MCP client integration guide](https://github.com/makenotion/notion-cookbook/blob/main/docs/mcp-client-integration.md) for step-by-step instructions on implementing OAuth and connecting to Notion MCP.
  </Accordion>
</AccordionGroup>

**What's Next**

Learn what you can do with Notion MCP using the tools we provide:

---

> ## Documentation Index
> Fetch the complete documentation index at: https://developers.notion.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Working with page content

> Learn about page content and how to add or retrieve it with the Notion API.

## Overview

[Pages](https://www.notion.so/help/category/write-edit-and-customize) are where users write everything from quick notes, to shared documents, to curated landing pages in Notion. Integrations can help users turn Notion into the single source of truth by syndicating content or help users gather, connect, and visualize content inside Notion.

In this guide, you'll learn about how the building blocks of page content are represented in the API and what you can do with them. By the end, you'll be able to create new pages with content, read content from other pages, and add blocks to existing pages.

### Page content versus properties

In general, **page properties** are best for capturing structured information such as a due date, a category, or a relationship to another page. **Page content** is best for looser structures or free form content. Page content is where users compose their thoughts or tell a story. Page properties are where users capture data and build systems. Your integration should aim to use each in the way users expect.

<Frame caption="Visualizing page properties versus page content">
  <img src="https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/369b6a5-page-properties-and-content.png?fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=0887fcbaa5537be57e38124ee0fa409c" data-og-width="2238" width="2238" data-og-height="1248" height="1248" data-path="images/docs/369b6a5-page-properties-and-content.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/369b6a5-page-properties-and-content.png?w=280&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=6de7cd31f3ca9ae96fe3195cc0264e3d 280w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/369b6a5-page-properties-and-content.png?w=560&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=93a7971408d3c1ec8ce49addce6682b9 560w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/369b6a5-page-properties-and-content.png?w=840&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=eaef9403390591aac412d18aff1b782c 840w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/369b6a5-page-properties-and-content.png?w=1100&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=4d8075a5466886863a875fab98ccbe8f 1100w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/369b6a5-page-properties-and-content.png?w=1650&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=5731c3eba6f407aeeee944e05cbb0c68 1650w, https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/369b6a5-page-properties-and-content.png?w=2500&fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=d15b19751ffa67b5cac88806cd8e3f17 2500w" />
</Frame>

## Modeling content as blocks

A page's content is represented by a list of [block objects](/reference/block). These blocks are referred to as the page's children. Each block has a type, such as a paragraph, a heading, or an image. Some types of blocks, such as a toggle list, have children of their own.

Let's start with a simple example, a [paragraph block](/reference/block#paragraph):

<CodeGroup>
  ```js JavaScript theme={null}
  {
    "object": "block",
    "id": "380c78c0-e0f5-4565-bdbd-c4ccb079050d",
    "type": "paragraph",
    "created_time": "",
    "last_edited_time": "",
    "has_children": false,

    "paragraph": {
      "text": [/* details omitted */]
    }
  }
  ```
</CodeGroup>

Paragraph blocks include common properties which every block includes: `object`, `type`, `created_time`, `last_edited_time`, and `has_children`. In addition, it contains type-specific information inside the `paragraph` property. Paragraph blocks have a `text` property. Other block types have different type-specific properties.

Now let's look at an example where the block has child blocks: a paragraph followed by an indented [todo block](/reference/block#to-do):

<CodeGroup>
  ```js JavaScript expandable theme={null}
  {
    "object": "block",
    "id": "380c78c0-e0f5-4565-bdbd-c4ccb079050d",
    "type": "paragraph",
    "created_time": "",
    "last_edited_time": "",
    "has_children": true,

    "paragraph": {
      "text": [/* details omitted */],
      "children": [
        {
          "object": "block",
          "id": "6d5b2463-a1c1-4e22-9b3b-49b3fe7ad384",
          "type": "to_do",
          "created_time": "",
          "last_edited_time": "",
          "has_children": false,

          "to_do": {
            "text": [/* details omitted */],
            "checked": false
          }
        }
      ]
    }
  }
  ```
</CodeGroup>

Child blocks are represented as a list of blocks inside the type-specific property. When a block has children, the `has_children` property is `true`. Only some block types, like paragraph blocks, support children.

<Note>
  **Pages are also blocks**

  Pages are a special kind of block, but they have children like many other block types. When [retrieving a list of child blocks](/reference/get-block-children), you can use the page ID as a block ID.

  When a child page appears inside another page, it's represented as a `child_page` block, which does not have children. You should think of this as a reference to the page block.
</Note>

<Warning>
  **Unsupported block types**

  The Notion API currently supports a subset of Notion [block](/reference/block#block-type-objects) types, with support for more coming soon. When an unsupported block type appears in a page, it will have the type `"unsupported"`.
</Warning>

### Rich text

In the previous block examples, the omitted value of the text property is a list of [rich text objects](/reference/rich-text). Rich text objects can describe more than a simple string - the object includes style information, links, mentions, and more.

Let's look at a simple example that just contains the words "Grocery List":

<CodeGroup>
  ```js JavaScript theme={null}
  {
    "type": "text",
    "text": {
      "content": "Grocery List",
      "link": null
    },
    "annotations": {
      "bold": false,
      "italic": false,
      "strikethrough": false,
      "underline": false,
      "code": false,
      "color": "default"
    },
    "plain_text": "Grocery List",
    "href": null
  }
  ```
</CodeGroup>

Rich text objects follow a similar pattern for type-specific configuration. The rich text object above has a type of `"text"`, and it has additional configuration related to that type in the `text` property. Other information that does not depend on the type, such as `annotations`, `plain_text`, and `href`, are at the top level of the rich text object.

Rich text is used both in page content and inside [page property values](/reference/page-property-values).

## Creating a page with content

Pages can be created with child blocks using the [create a page](/reference/post-page) endpoint. This endpoint supports creating a page within another page, or creating a page within a database.

Let's try creating a page within another page with some sample content. We will use all three parameters for this endpoint. The parent parameter is a [page parent](/reference/page#page-parent). We can build this object using an existing page ID:

<CodeGroup>
  ```js JavaScript theme={null}
  {
    "type": "page_id",
    "page_id": "494c87d0-72c4-4cf6-960f-55f8427f7692"
  }
  ```
</CodeGroup>

<Note>
  **Permissions**

  Before an integration can create a page within another page, it needs access to the page parent. To share a page with an integration, click the `•••` menu at the top right of a page, scroll to `Add connections`, and use the search bar to find and select the integration from the dropdown list.
</Note>

<Note>
  **Where can I find my page's ID?**

  Here's a quick procedure to find the page ID for a specific page in Notion:

  <Steps>
    <Step>
      Open the page in Notion.
    </Step>

    <Step>
      Use the Share menu to Copy link.
    </Step>

    <Step>
      Now paste the link in your text editor so you can take a closer look.
    </Step>

    <Step>
      The URL ends in a page ID. It should be a 32 character long string. Format this value by inserting hyphens (-) in the following pattern:

      1. 8-4-4-4-12 (each number is the length of characters between the hyphens).
      2. Example: `1429989fe8ac4effbc8f57f56486db54` becomes `1429989f-e8ac-4eff-bc8f-57f56486db54`.
      3. This value is your page ID.

      While this procedure is helpful to try the API, **you shouldn't ask users to do this for your integration**. It's more common for an integration to determine a page ID by calling the [search API](/reference/post-search).
    </Step>
  </Steps>
</Note>

The `properties` parameter is an object which describes the page properties. Let's use a simple example with only the required `title` property:

<CodeGroup>
  ```js JavaScript theme={null}
  {
    "Name": {
      "type": "title",
      "title": [{ "type": "text", "text": { "content": "A note from your pals at Notion" } }]
    }
  }
  ```
</CodeGroup>

<Note>
  **Page properties within a database**

  Pages within a database parent require properties to conform to the database's schema. Follow the [working with databases guide](/guides/data-apis/working-with-databases) for an in-depth discussion with examples.
</Note>

The children parameter is a list of [block objects]() which describe the page content. Let's use some sample content:

<CodeGroup>
  ```js JavaScript theme={null}
  [
    {
      "object": "block",
      "type": "paragraph",
      "paragraph": {
        "rich_text": [{ "type": "text", "text": { "content": "You made this page using the Notion API. Pretty cool, huh? We hope you enjoy building with us." } }]
      }
    }
  ]
  ```
</CodeGroup>

<Note>
  **Size limits**

  When creating new blocks, keep in mind that the Notion API has [size limits](/reference/errors#size-limits) for the content.
</Note>

Using all three of the parameters, we create a page by sending a request to [the endpoint](/reference/post-page).

<CodeGroup>
  ```bash cURL expandable theme={null}
  curl -X POST https://api.notion.com/v1/pages \
    -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
    -H "Content-Type: application/json" \
    -H "Notion-Version: 2022-06-28" \
    --data '{
  	"parent": { "page_id": "494c87d0-72c4-4cf6-960f-55f8427f7692" },
  	"properties": {
  		"title": {
        "title": [{ "type": "text", "text": { "content": "A note from your pals at Notion" } }]
  		}
  	},
  	"children": [
      {
        "object": "block",
        "type": "paragraph",
        "paragraph": {
          "rich_text": [{ "type": "text", "text": { "content": "You made this page using the Notion API. Pretty cool, huh? We hope you enjoy building with us." } }]
        }
      }
    ]
  }'
  ```

  ```javascript JavaScript expandable theme={null}
  const { Client } = require('@notionhq/client');

  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  (async () => {
    const response = await notion.pages.create({
      parent: {
        page_id: '494c87d072c44cf6960f55f8427f7692',
      },
      properties: {
        title: {
          type: 'title',
          title: [
            {
              type: 'text',
              text: {
                content: 'A note from your pals at Notion',
              },
            },
          ],
        },
      },
      children: [
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            text: [
              {
                type: 'text',
                text: {
                  content: 'You made this page using the Notion API. Pretty cool, huh? We hope you enjoy building with us.',
                },
              },
            ],
          },
        },
      ],
    });
    console.log(response);
  })();
  ```
</CodeGroup>

Once the page is added, you'll receive a response containing the new [page object](/reference/page). Take a look inside Notion and view your new page.

## Reading blocks from a page

Page content can be read from a page using the [retrieve block children](/reference/get-block-children) endpoint. This endpoint returns a list of children for any block which supports children. While pages are a common starting point for reading block children, you can retrieve the block children of other kinds of blocks, too.

The `block_id` parameter is the ID of any existing block. If you're following from the example above, the response contained a page ID. Let's use that page ID to read the sample content from the page. We'll use `"16d8004e-5f6a-42a6-9811-51c22ddada12"` as the block ID.

Using this `block_id`, we retrieve the block children by sending a request to [the endpoint](/reference/get-block-children).

<CodeGroup>
  ```curl cURL theme={null}
  curl https://api.notion.com/v1/blocks/16d8004e-5f6a-42a6-9811-51c22ddada12/children?page_size=100 \
  -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
  -H "Notion-Version: 2025-09-03"
  ```

  ```javascript JavaScript theme={null}
  const { Client } = require('@notionhq/client');

  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  (async () => {
    const blockId = '16d8004e5f6a42a6981151c22ddada12';
    const response = await notion.blocks.children.list({
      block_id: blockId,
    });
    console.log(response);
  })();
  ```
</CodeGroup>

You'll receive a response that contains a list of block objects.

<CodeGroup>
  ```js JavaScript theme={null}
  {
    "object": "list",
    "results": [
      {
        "object": "block",
        /* details omitted */
      }
    ],
    "has_more": false,
    "next_cursor": null
  }
  ```
</CodeGroup>

This is a paginated response. Paginated responses are used throughout the Notion API when returning a potentially large list of objects. The maximum number of results in one paginated response is 100. The [pagination reference](/reference/pagination) explains how to use the "start\_cursor" and "page\_size" parameters to get more than 100 results.

In this case, the individual child blocks we requested are in the "results" array.

### Reading nested blocks

What happens when the results contain a block that has its own children? In this case, the response will not contain those children, but the `has_children` property will be `true`. If your integration needs a complete representation of a page's (or any block's) content, it should search the results for blocks with `has_children` set to `true`, and recursively call the [retrieve block children](/reference/get-block-children) endpoint.

Reading large pages may take some time. We recommend using asynchronous operations in your architecture, such as a job queue. You will also need to be mindful of [rate limits](/reference/errors#rate-limits) to appropriately slow down making new requests after the limit is met.

## Appending blocks to a page

Integrations can add more content to a page by using the [append block children](/reference/patch-block-children) endpoint. Let's try to add another block to the page we created in the example above. This endpoint requires two parameters: `block_id` and `children`.

The `block_id` parameter is the ID of any existing block. If you're following from the example above, let's use the same page ID as the block ID: `"16d8004e-5f6a-42a6-9811-51c22ddada12"`.

The `children` parameter is a list of [block objects](/reference/block) which describe the content we want to append. Let's use some more sample content:

<CodeGroup>
  ```js JavaScript theme={null}
  [
    {
      "object": "block",
      "type": "paragraph",
      "paragraph": {
        "text": [{ "type": "text", "text": { "content": "– Notion API Team", "link": { "type": "url", "url": "https://twitter.com/NotionAPI" } } }]
      }
    }
  ]
  ```
</CodeGroup>

Using both parameters, we append blocks by sending a request to [the endpoint](/reference/patch-block-children).

<CodeGroup>
  ```bash cURL theme={null}
  curl -X PATCH https://api.notion.com/v1/blocks/16d8004e-5f6a-42a6-9811-51c22ddada12/children \
    -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
    -H "Content-Type: application/json" \
    -H "Notion-Version: 2022-06-28" \
    --data '{
    "children": [
      {
        "object": "block",
        "type": "paragraph",
        "paragraph": {
          "text": [{ "type": "text", "text": { "content": "– Notion API Team", "link": { "type": "url", "url": "https://twitter.com/NotionAPI" } } }]
        }
      }
    ]
  }'
  ```

  ```javascript JavaScript theme={null}
  const { Client } = require('@notionhq/client');

  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  (async () => {
    const blockId = '16d8004e5f6a42a6981151c22ddada12';
    const response = await notion.blocks.children.append({
      block_id: blockId,
      children: [
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            text: [
              {
                type: 'text',
                text: {
                  content: '– Notion API Team',
                  link: {
                    type: 'url',
                    url: 'https://twitter.com/NotionAPI',
                  },
                },
              },
            ],
          },
        },
      ],
    });
    console.log(response);
  })();
  ```
</CodeGroup>

You'll receive a response that contains the updated block. The response does not contain the child blocks, but it will show `has_children` set to `true`.

By default, new block children are appended at the end of the parent block. To place the block after a specific child block and not at the end, use the `after` body parameter. `after` should be set to the ID of the existing child block you are appending the new block after. For example, if the parent `block_id` is for a block that contains a bulleted list, you can set the `after` parameter to the block ID of the list item you want the new block children to be appended after.

<CodeGroup>
  ```bash cURL theme={null}
  curl -X PATCH https://api.notion.com/v1/blocks/16d8004e-5f6a-42a6-9811-51c22ddada12/children \
    -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
    -H "Content-Type: application/json" \
    -H "Notion-Version: 2022-06-28" \
    --data '{
      "children": [
      {
        "object": "block",
        "type": "paragraph",
        "paragraph": {
          "text": [{ "type": "text", "text": { "content": "– Notion API Team", "link": { "type": "url", "url": "https://twitter.com/NotionAPI" } } }]
        }
      }
    ], after: "<block_id_to_append_after>"
  }'
  ```
</CodeGroup>

## Conclusion

Nearly everything users see inside Notion is represented as blocks. Now that you've understood how your integration can build pages with blocks, read blocks, and add blocks to pages - you've unlocked most of the surface area in Notion. You integration can engage users where they do everything from creative writing, to building documentation, and more.

### Next steps

* This guide explains working with page content. Take a look at [working with database properties](/guides/data-apis/working-with-databases#database-properties).
* Explore the [block object](/reference/block) to see other types of blocks you can create.
* Learn more about the various kinds of [rich text objects](/reference/rich-text).
* Learn more about [pagination](/reference/intro#pagination).
