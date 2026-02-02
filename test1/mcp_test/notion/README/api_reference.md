> ## Documentation Index
> Fetch the complete documentation index at: https://developers.notion.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Introduction

> The reference is your key to a comprehensive understanding of the Notion API.

Integrations use the API to access Notion's pages, databases, and users. Integrations can connect services to Notion and build interactive experiences for users within Notion. Using the navigation on the left, you'll find details for objects and endpoints used in the API.

<Note>
  You need an integration token to interact with the Notion API. You can find an integration token after you create an integration on the integration settings page. If this is your first look at the Notion API, we recommend beginning with the [Getting started guide](/guides/get-started/getting-started) to learn how to create an integration.

  If you want to work on a specific integration, but can't access the token, confirm that you are an admin in the associated workspace. You can check inside the Notion UI via `Settings & Members` in the left sidebar. If you're not an admin in any of your workspaces, you can create a personal workspace for free.
</Note>

## Conventions

The base URL to send all API requests is `https://api.notion.com`. HTTPS is required for all API requests.

The Notion API follows RESTful conventions when possible, with most operations performed via `GET`, `POST`, `PATCH`, and `DELETE` requests on page and database resources. Request and response bodies are encoded as JSON.

### JSON conventions

* Top-level resources have an `"object"` property. This property can be used to determine the type of the resource (e.g. `"database"`, `"user"`, etc.)
* Top-level resources are addressable by a UUIDv4 `"id"` property. You may omit dashes from the ID when making requests to the API, e.g. when copying the ID from a Notion URL.
* Property names are in `snake_case` (not `camelCase` or `kebab-case`).
* Temporal values (dates and datetimes) are encoded in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) strings. Datetimes will include the time value (`2020-08-12T02:12:33.231Z`) while dates will include only the date (`2020-08-12`)
* The Notion API does not support empty strings. To unset a string value for properties like a `url` [Property value object](/reference/property-value-object), for example, use an explicit `null` instead of `""`.

## Code samples & SDKs

Samples requests and responses are shown for each endpoint. Requests are shown using the Notion [JavaScript SDK](https://github.com/makenotion/notion-sdk-js), and [cURL](https://curl.se/). These samples make it easy to copy, paste, and modify as you build your integration.

Notion SDKs are open source projects that you can install to easily start building. You may also choose any other language or library that allows you to make HTTP requests.

## Pagination

Endpoints that return lists of objects support cursor-based pagination requests. By default, Notion returns ten items per API call. If the number of items in a response from a support endpoint exceeds the default, then an integration can use pagination to request a specific set of the results and/or to limit the number of returned items.

### Supported endpoints

| HTTP method | Endpoint                                                             |
| :---------- | :------------------------------------------------------------------- |
| GET         | [List all users](/reference/get-users)                               |
| GET         | [Retrieve block children](/reference/get-block-children)             |
| GET         | [Retrieve a comment](/reference/list-comments)                       |
| GET         | [Retrieve a page property item](/reference/retrieve-a-page-property) |
| POST        | [Query a data source](/reference/query-a-data-source)                |
| POST        | [Search](/reference/post-search)                                     |

### Responses

If an endpoint supports pagination, then the response object contains the below fields.

| Field         | Type                                                                                                                                                          | Description                                                                                                                                                                                                                                                 |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `has_more`    | `boolean`                                                                                                                                                     | Whether the response includes the end of the list. `false` if there are no more results. Otherwise, `true`.                                                                                                                                                 |
| `next_cursor` | `string`                                                                                                                                                      | A string that can be used to retrieve the next page of results by passing the value as the `start_cursor` [parameter](#parameters-for-paginated-requests) to the same endpoint.<br /><br /> Only available when `has_more` is true.                         |
| `object`      | `"list"`                                                                                                                                                      | The constant string `"list"`.                                                                                                                                                                                                                               |
| `results`     | `array of objects`                                                                                                                                            | The list, or partial list, of endpoint-specific results. Refer to a [supported endpoint](#supported-endpoints)'s individual documentation for details.                                                                                                      |
| `type`        | `"block"`<br /><br />`"comment"`<br /><br />`"database"`<br /><br />`"page"`<br /><br />`"page_or_database"`<br /><br />`"property_item"`<br /><br />`"user"` | A constant string that represents the type of the objects in `results`.                                                                                                                                                                                     |
| `{type}`      | [`paginated list object`](/reference/page-property-values#paginated-page-properties)                                                                          | An object containing type-specific pagination information. For `property_item`s, the value corresponds to the [paginated page property type](/reference/page-property-values#paginated-page-properties). For all other types, the value is an empty object. |

### Parameters for paginated requests

<Warning>
  **Parameter location varies by endpoint**

  `GET` requests accept parameters in the query string.

  `POST` requests receive parameters in the request body.
</Warning>

| Parameter      | Type     | Description                                                                                                                                                                                                |
| :------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `page_size`    | `number` | The number of items from the full list to include in the response. <br /><br /> **Default**: `100`<br />**Maximum**: `100` <br /><br /> The response may contain fewer than the default number of results. |
| `start_cursor` | `string` | A `next_cursor` value returned in a previous [response](#responses). Treat this as an opaque value. <br /><br /> Defaults to `undefined`, which returns results from the beginning of the list.            |

### How to send a paginated request

<Steps>
  <Step>
    Send an initial request to the [supported endpoint](https://dev.notion.so/Review-Pagination-documentation-e48701d7465444c7ad79237914aa47cd).
  </Step>

  <Step>
    Retrieve the `next_cursor` value from the response (only available when `has_more` is `true`).
  </Step>

  <Step>
    Send a follow up request to the endpoint that includes the `next_cursor` param in either the query string (for `GET` requests) or in the body params (`POST` requests).
  </Step>
</Steps>

#### Example: request the next set of query results from a database

<CodeGroup>
  ```curl cURL theme={null}
  curl --location --request POST 'https://api.notion.com/v1/databases/<database_id>/query' \
  --header 'Authorization: Bearer <secret_bot>' \
  --header 'Content-Type: application/json' \
  --data '{
      "start_cursor": "33e19cb9-751f-4993-b74d-234d67d0d534"
  }'
  ```
</CodeGroup>

---

> ## Documentation Index
> Fetch the complete documentation index at: https://developers.notion.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Block

> A block object represents a piece of content within Notion. The API translates the headings, toggles, paragraphs, lists, media, and more that you can interact with in the Notion UI as different [block type objects](/reference/block#block-type-objects).

For example, the following block object represents a `Heading 2` in the Notion UI:

<CodeGroup>
  ```json Example Block Object expandable theme={null}
  {
  	"object": "block",
  	"id": "c02fc1d3-db8b-45c5-a222-27595b15aea7",
  	"parent": {
  		"type": "page_id",
  		"page_id": "59833787-2cf9-4fdf-8782-e53db20768a5"
  	},
  	"created_time": "2022-03-01T19:05:00.000Z",
  	"last_edited_time": "2022-07-06T19:41:00.000Z",
  	"created_by": {
  		"object": "user",
  		"id": "ee5f0f84-409a-440f-983a-a5315961c6e4"
  	},
  	"last_edited_by": {
  		"object": "user",
  		"id": "ee5f0f84-409a-440f-983a-a5315961c6e4"
  	},
  	"has_children": false,
  	"archived": false,
    "in_trash": false,
  	"type": "heading_2",
  	"heading_2": {
  		"rich_text": [
  			{
  				"type": "text",
  				"text": {
  					"content": "Lacinato kale",
  					"link": null
  				},
  				"annotations": {
  					"bold": false,
  					"italic": false,
  					"strikethrough": false,
  					"underline": false,
  					"code": false,
  					"color": "green"
  				},
  				"plain_text": "Lacinato kale",
  				"href": null
  			}
  		],
  		"color": "default",
      "is_toggleable": false
  	}
  }
  ```
</CodeGroup>

Use the [Retrieve block children](/reference/get-block-children) endpoint to list all of the blocks on a page.

## Keys

<Note>
  Fields marked with an \* are available to integrations with any capabilities. Other properties require read content capabilities in order to be returned from the Notion API. Consult the [integration capabilities reference](/reference/capabilities) for details.
</Note>

| Field              | Type                                                                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Example value                                                                                                  |
| :----------------- | :---------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------- |
| `object`\*         | `string`                                                                | Always `"block"`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `"block"`                                                                                                      |
| `id`\*             | `string` (UUIDv4)                                                       | Identifier for the block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `"7af38973-3787-41b3-bd75-0ed3a1edfac9"`                                                                       |
| `parent`           | `object`                                                                | Information about the block's parent. See [Parent object](/reference/parent-object).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `{ "type": "block_id", "block_id": "7d50a184-5bbe-4d90-8f29-6bec57ed817b" }`                                   |
| `type`             | `string` (enum)                                                         | Type of block. Possible values are: <br /><br />- [`"bookmark"`](/reference/block#bookmark) <br />- [`"breadcrumb"`](/reference/block#breadcrumb) <br />- [`"bulleted_list_item"`](/reference/block#bulleted-list-item) <br />- [`"callout"`](/reference/block#callout) <br />- [`"child_database"`](/reference/block#child-database) <br />- [`"child_page"`](/reference/block#child-page) <br />- [`"column"`](/reference/block#column-list-and-column) <br />- [`"column_list"`](/reference/block#column-list-and-column) <br />- [`"divider"`](/reference/block#divider) <br />- [`"embed"`](/reference/block#embed) <br />- [`"equation"`](/reference/block#equation) <br />- [`"file"`](/reference/block#file) <br />- [`"heading_1"`](/reference/block#headings) <br />- [`"heading_2"`](/reference/block#headings) <br />- [`"heading_3"`](/reference/block#headings) <br />- [`"image"`](/reference/block#image) <br />- [`"link_preview"`](/reference/block#link-preview) <br />- [`"numbered_list_item"`](/reference/block#numbered-list-item) <br />- [`"paragraph"`](/reference/block#paragraph) <br />- [`"pdf"`](/reference/block#pdf) <br />- [`"quote"`](/reference/block#quote) <br />- [`"synced_block"`](/reference/block#synced-block) <br />- [`"table"`](/reference/block#table) <br />- [`"table_of_contents"`](/reference/block#table-of-contents) <br />- [`"table_row"`](/reference/block#table-rows) <br />- [`"template"`](/reference/block#template) <br />- [`"to_do"`](/reference/block#to-do) <br />- [`"toggle"`](/reference/block#toggle-blocks) <br />- `"unsupported"` <br />- [`"video"`](/reference/block#video) | `"paragraph"`                                                                                                  |
| `created_time`     | `string` ([ISO 8601 date time](https://en.wikipedia.org/wiki/ISO_8601)) | Date and time when this block was created. Formatted as an [ISO 8601 date time](https://en.wikipedia.org/wiki/ISO_8601) string.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `"2020-03-17T19:10:04.968Z"`                                                                                   |
| `created_by`       | [Partial User](/reference/user)                                         | User who created the block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `{"object": "user","id": "45ee8d13-687b-47ce-a5ca-6e2e45548c4b"}`                                              |
| `last_edited_time` | `string` ([ISO 8601 date time](https://en.wikipedia.org/wiki/ISO_8601)) | Date and time when this block was last updated. Formatted as an [ISO 8601 date time](https://en.wikipedia.org/wiki/ISO_8601) string.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `"2020-03-17T19:10:04.968Z"`                                                                                   |
| `last_edited_by`   | [Partial User](/reference/user)                                         | User who last edited the block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `{"object": "user","id": "45ee8d13-687b-47ce-a5ca-6e2e45548c4b"}`                                              |
| `archived`         | `boolean`                                                               | The archived status of the block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `false`                                                                                                        |
| `in_trash`         | `boolean`                                                               | Whether the block has been deleted.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `false`                                                                                                        |
| `has_children`     | `boolean`                                                               | Whether or not the block has children blocks nested within it.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `true`                                                                                                         |
| `{type}`           | [`block type object`](/reference/block#block-type-objects)              | An object containing type-specific block information.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Refer to the [block type object section](/reference/block#block-type-objects) for examples of each block type. |

#### Block types that support child blocks

Some block types contain nested blocks. The following block types support child blocks:

* [Bulleted list item](/reference/block#bulleted-list-item)
* [Callout](/reference/block#callout)
* [Child database](/reference/block#child-database)
* [Child page](/reference/block#child-page)
* [Column](/reference/block#column-list-and-column)
* [Heading 1](/reference/block#headings), when the `is_toggleable` property is `true`
* [Heading 2](/reference/block#headings), when the `is_toggleable` property is `true`
* [Heading 3](/reference/block#headings), when the `is_toggleable` property is `true`
* [Numbered list item](/reference/block#numbered-list-item)
* [Paragraph](/reference/block#paragraph)
* [Quote](/reference/block#quote)
* [Synced block](/reference/block#synced-block)
* [Table](/reference/block#table)
* [Template](/reference/block#template)
* [To do](/reference/block#to-do)
* [Toggle](/reference/block#toggle-blocks)

<Note>
  **The API does not support all block types.**

  Only the block type objects listed in the reference below are supported. Any unsupported block types appear in the structure, but contain a `type` set to `"unsupported"`.
</Note>

## Block type objects

Every block object has a key corresponding to the value of `type`. Under the key is an object with type-specific block information.

<Note>
  Many block types support rich text. In cases where it is supported, a [`rich_text` object](/reference/rich-text) will be included in the block `type` object. All `rich_text` objects will include a `plain_text` property, which provides a convenient way for developers to access unformatted text from the Notion block.
</Note>

### Audio

Audio block objects contain a [file object](/reference/file-object) detailing information about the audio file.

<CodeGroup>
  ```json Example Audio block object theme={null}
  {
    "type": "audio",
    //...other keys excluded
    "audio": {
      "type": "external",
      "external": {
        "url": "https://companywebsite.com/files/sample.mp3"
      }
    }
  }
  ```
</CodeGroup>

#### Supported audio types

The following file types can be attached with external URLs in the API as well as in the Notion app UI:

* `.mp3`
* `.wav`
* `.ogg`
* `.oga`
* `.m4a`

A wider set of audio files is [supported in the File Upload API](/guides/data-apis/working-with-files-and-media) and can be attached using a `file_upload` ID.

#### Supported file upload types

See the [file upload reference](/reference/file-upload#file-types-and-sizes) for a list of supported file extensions and content types when attaching a File Upload to a block.

Audio blocks only support file types in the "audio" section of the table.

### Bookmark

Bookmark block objects contain the following information within the `bookmark` property:

| Field     | Type                                                    | Description                   |
| :-------- | :------------------------------------------------------ | :---------------------------- |
| `caption` | array of [rich text objects](/reference/rich-text) text | The caption for the bookmark. |
| `url`     | string                                                  | The link for the bookmark.    |

<CodeGroup>
  ```json Example Bookmark block object theme={null}
  {
    //...other keys excluded
    "type": "bookmark",
    //...other keys excluded
    "bookmark": {
      "caption": [],
      "url": "https://companywebsite.com"
    }
  }
  ```
</CodeGroup>

### Breadcrumb

Breadcrumb block objects do not contain any information within the `breadcrumb` property.

<CodeGroup>
  ```json Example Breadcrumb block object theme={null}
  {
    //...other keys excluded
    "type": "breadcrumb",
    //...other keys excluded
    "breadcrumb": {}
  }
  ```
</CodeGroup>

### Bulleted list item

Bulleted list item block objects contain the following information within the `bulleted_list_item` property:

| Field       | Type                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------- | :--------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rich_text` | `array` of [rich text objects](/reference/rich-text) | The rich text in the `bulleted_list_item` block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `color`     | `string` (enum)                                      | The color of the block. Possible values are: <br /><br />- `"blue"` <br />- `"blue_background"` <br />- `"brown"`<br /> - `"brown_background"` <br />- `"default"` <br />- `"gray"` <br />- `"gray_background"` <br />- `"green"` <br />- `"green_background"` <br />- `"orange"` <br />- `"orange_background"` <br />- `"yellow"` <br />- `"green"` <br />- `"pink"` <br />- `"pink_background"` <br />- `"purple"` <br />- `"purple_background"` <br />- `"red"` <br />- `"red_background"` <br />- `"yellow_background"` |
| `children`  | `array` of [block objects](/reference/block)         | The nested child blocks (if any) of the `bulleted_list_item` block.                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

<CodeGroup>
  ```json Example Bulleted list item block object theme={null}
  {
    //...other keys excluded
    "type": "bulleted_list_item",
    //...other keys excluded
    "bulleted_list_item": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
          "link": null
        }
        // ..other keys excluded
      }],
      "color": "default",
      "children":[{
        "type": "paragraph"
        // ..other keys excluded
      }]
    }
  }
  ```
</CodeGroup>

### Callout

Callout block objects contain the following information within the `callout` property:

| Field       | Type                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------- | :--------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rich_text` | `array` of [rich text objects](/reference/rich-text) | The rich text in the `callout` block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `icon`      | `object`                                             | An [emoji](/reference/emoji-object) or [file](/reference/file-object) object that represents the callout's icon. If the callout does not have an icon.                                                                                                                                                                                                                                                                                                                                                                      |
| `color`     | `string` (enum)                                      | The color of the block. Possible values are: <br /><br />- `"blue"` <br />- `"blue_background"` <br />- `"brown"`<br /> - `"brown_background"` <br />- `"default"` <br />- `"gray"` <br />- `"gray_background"` <br />- `"green"` <br />- `"green_background"` <br />- `"orange"` <br />- `"orange_background"` <br />- `"yellow"` <br />- `"green"` <br />- `"pink"` <br />- `"pink_background"` <br />- `"purple"` <br />- `"purple_background"` <br />- `"red"` <br />- `"red_background"` <br />- `"yellow_background"` |

<CodeGroup>
  ```json Example Callout block object expandable theme={null}
  {
    //...other keys excluded
  	"type": "callout",
     // ..other keys excluded
     "callout": {
     	"rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
          "link": null
        }
        // ..other keys excluded
      }],
       "icon": {
         "emoji": "⭐"
       },
       "color": "default"
     }
  }
  ```
</CodeGroup>

### Child database

Child database block objects contain the following information within the `child_database` property:

| Field   | Type     | Description                           |
| :------ | :------- | :------------------------------------ |
| `title` | `string` | The plain text title of the database. |

<CodeGroup>
  ```json Example Child database block theme={null}
  {
    //...other keys excluded
    "type": "child_database",
    //...other keys excluded
    "child_database": {
      "title": "My database"
    }
  }
  ```
</CodeGroup>

<Note>
  **Creating and updating `child_database` blocks**

  To create or update `child_database` type blocks, use the [Create a database](/reference/create-a-database) and the [Update a database](/reference/update-a-database) endpoints, specifying the ID of the parent page in the `parent` body param.
</Note>

### Child page

Child page block objects contain the following information within the `child_page` property:

| Field   | Type     | Description                         |
| :------ | :------- | :---------------------------------- |
| `title` | `string` | The plain text `title` of the page. |

<CodeGroup>
  ```json Example Child page block object theme={null}
  {
    //...other keys excluded
    "type": "child_page",
    //...other keys excluded
    "child_page": {
      "title": "Lacinato kale"
    }
  }
  ```
</CodeGroup>

<Note>
  **Creating and updating `child_page` blocks**

  To create or update `child_page` type blocks, use the [Create a page](/reference/post-page) and the [Update page](/reference/patch-page) endpoints, specifying the ID of the parent page in the `parent` body param.
</Note>

### Code

Code block objects contain the following information within the `code` property:

| Field       | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Description                                           |
| :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------- |
| `caption`   | `array` of [Rich text object](/reference/rich-text) text objects                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | The rich text in the caption of the code block.       |
| `rich_text` | `array` of [Rich text object](/reference/rich-text) text objects                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | The rich text in the code block.                      |
| `language`  | - `"abap"` - `"arduino"` - `"bash"` - `"basic"` - `"c"` - `"clojure"` - `"coffeescript"` - `"c++"` - `"c#"` - `"css"` - `"dart"` - `"diff"` - `"docker"` - `"elixir"` - `"elm"` - `"erlang"` - `"flow"` - `"fortran"` - `"f#"` - `"gherkin"` - `"glsl"` - `"go"` - `"graphql"` - `"groovy"` - `"haskell"` - `"html"` - `"java"` - `"javascript"` - `"json"` - `"julia"` - `"kotlin"` - `"latex"` - `"less"` - `"lisp"` - `"livescript"` - `"lua"` - `"makefile"` - `"markdown"` - `"markup"` - `"matlab"` - `"mermaid"` - `"nix"` - `"objective-c"` - `"ocaml"` - `"pascal"` - `"perl"` - `"php"` - `"plain text"` - `"powershell"` - `"prolog"` - `"protobuf"` - `"python"` - `"r"` - `"reason"` - `"ruby"` - `"rust"` - `"sass"` - `"scala"` - `"scheme"` - `"scss"` - `"shell"` - `"sql"` - `"swift"` - `"typescript"` - `"vb.net"` - `"verilog"` - `"vhdl"` - `"visual basic"` - `"webassembly"` - `"xml"` - `"yaml"` - `"java/c/c++/c#"` | The language of the code contained in the code block. |

<CodeGroup>
  ```json Example Code block object theme={null}
  {
    // ... other keys excluded
    "type": "code",
    // ... other keys excluded
    "code": {
      "caption": [],
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "const a = 3"
        }
      }],
      "language": "javascript"
    }
  }
  ```
</CodeGroup>

### Column list and column

Column lists are parent blocks for columns. They do not contain any information within the `column_list` property.

<CodeGroup>
  ```json Example Column list block object theme={null}
  {
    // ... other keys excluded
    "type": "column_list",
    // ... other keys excluded
    "column_list": {}
  }
  ```
</CodeGroup>

Columns are parent blocks for any block types listed in this reference except for other `column`s. They do not require any information within the `column` property, but a `width_ratio` number between 0 and 1 can be provided to customize the width of a column relative to others in the same column list. When omitted, the default is to use equal widths for all columns. When provided, `width_ratio`s should add up to 1.

Columns can only be appended to `column_list`s.

<CodeGroup>
  ```json Example Column object theme={null}
  {
    // ... other keys excluded
    "type": "column",
    // ... other keys excluded
    "column": {
      "width_ratio": 0.25
    }
  }
  ```
</CodeGroup>

When creating a `column_list` block via [Append block children](/reference/patch-block-children), the `column_list` must have at least two `column`s, and each `column` must have at least one child.

#### Retrieve the content in a column list

Follow these steps to fetch the content in a `column_list`:

<Steps>
  <Step>
    Get the `column_list` ID from a query to [Retrieve block children](/reference/get-block-children) for the parent page.
  </Step>

  <Step>
    Get the `column` children from a query to Retrieve block children for the `column_list`.
  </Step>

  <Step>
    Get the content in each individual `column` from a query to Retrieve block children for the unique `column` ID.
  </Step>
</Steps>

### Divider

Divider block objects do not contain any information within the `divider` property.

<CodeGroup>
  ```json Example Divider block object theme={null}
  {
    //...other keys excluded
    "type": "divider",
    //...other keys excluded
    "divider": {}
  }
  ```
</CodeGroup>

### Embed

Embed block objects include information about another website displayed within the Notion UI. The `embed` property contains the following information:

| Field | Type     | Description                                            |
| :---- | :------- | :----------------------------------------------------- |
| `url` | `string` | The link to the website that the embed block displays. |

<CodeGroup>
  ```json Example Embed block object theme={null}
  {
    //...other keys excluded
    "type": "embed",
    //...other keys excluded
    "embed": {
      "url": "https://companywebsite.com"
    }
  }
  ```
</CodeGroup>

<Warning>
  **Differences in embed blocks between the Notion app and the API**

  The Notion app uses a 3rd-party service, iFramely, to validate and request metadata for embeds given a URL. This works well in a web app because Notion can kick off an asynchronous request for URL information, which might take seconds or longer to complete, and then update the block with the metadata in the UI after receiving a response from iFramely.

  We chose not to call iFramely when creating embed blocks in the API because the API needs to be able to return faster than the UI, and because the response from iFramely could actually cause us to change the block type. This would result in a slow and potentially confusing experience as the block in the response would not match the block sent in the request.

  The result is that embed blocks created via the API may not look exactly like their counterparts created in the Notion app.
</Warning>

<Check>
  Vimeo video links can be embedded in a Notion page via the public API using the embed block type.

  For example, the following object can be passed to the [Append block children endpoint](/reference/patch-block-children):

  ```json JSON theme={null}
  {
    "children": [
      {
        "embed": {
          "url": "https://player.vimeo.com/video/226053498?h=a1599a8ee9"
        }
      }
    ]
  }
  ```

  For other video sources, see [Supported video types](/reference/block#supported-video-types).
</Check>

### Equation

Equation block objects are represented as children of [paragraph](/reference/block#paragraph) blocks. They are nested within a [rich text object](/reference/rich-text) and contain the following information within the `equation` property:

| Field        | Type     | Description                |
| :----------- | :------- | :------------------------- |
| `expression` | `string` | A KaTeX compatible string. |

<CodeGroup>
  ```json Example Equation object theme={null}
  {
    //...other keys excluded
    "type": "equation",
    //...other keys excluded
    "equation": {
      "expression": "e=mc^2"
    }
  }
  ```
</CodeGroup>

### File

File block objects contain the following information within the `file` property:

| Field         | Type                                                                        | Description                                                                                                                                                                                                                                                                                                                                                                                         |
| :------------ | :-------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `caption`     | `array` of [rich text objects](/reference/rich-text)                        | The caption of the file block.                                                                                                                                                                                                                                                                                                                                                                      |
| `type`        | One of: <br /><br />- `"file"` <br />- `"external"` <br />- `"file_upload"` | Type of file. This enum value indicates which of the following three objects are populated.                                                                                                                                                                                                                                                                                                         |
| `file`        | [Notion-hosted file object](/reference/file-object#notion-hosted-files)     | A file object that details information about the file contained in the block: a temporary download `url` and `expiry_time`. After the `expiry_time`, fetch the block again from the API to get a new `url`. <br /><br />Only valid as a parameter if copied verbatim from the `file` field of a recent block API response from Notion. To attach a file, provide a `type` of `file_upload` instead. |
| `external`    | [External file object](/reference/file-object#external-files)               | An object with a `url` property, identifying a publicly accessible URL.                                                                                                                                                                                                                                                                                                                             |
| `file_upload` | [File upload object](/reference/file-upload#file-types-and-sizes)           | An object with the `id` of a [FileUpload](/reference/file-upload) to attach to the block. After attaching, the API response responds with a type of `file`, not `file_upload`, so your integration can access a download `url`.                                                                                                                                                                     |
| `name`        | `string`                                                                    | The name of the file, as shown in the Notion UI. Note that the UI may auto-append `.pdf` or other extensions.<br /><br /> When attaching a `file_upload`, the `name` parameter is not required.                                                                                                                                                                                                     |

<CodeGroup>
  ```json Example File block theme={null}
  {
    // ... other keys excluded
    "type": "file",
    // ... other keys excluded
    "file": {
      "caption": [],
      "type": "external",
      "external": {
        "url": "https://companywebsite.com/files/doc.txt"
      },
      "name": "doc.txt"
    }
  }
  ```
</CodeGroup>

### Headings

All heading block objects, `heading_1`, `heading_2`, and `heading_3`, contain the following information within their corresponding objects:

| Field           | Type                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :-------------- | :--------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rich_text`     | `array` of [rich text objects](/reference/rich-text) | The rich text of the heading.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `color`         | `string` (enum)                                      | The color of the block. Possible values are: <br /><br />- `"blue"` <br />- `"blue_background"` <br />- `"brown"` <br />- `"brown_background"` <br />- `"default"` <br />- `"gray"` <br />- `"gray_background"` <br />- `"green"` <br />- `"green_background"` <br />- `"orange"` <br />- `"orange_background"` <br />- `"yellow"` <br />- `"green"` <br />- `"pink"` <br />- `"pink_background"` <br />- `"purple"` <br />- `"purple_background"` <br />- `"red"` <br />- `"red_background"` <br />- `"yellow_background"` |
| `is_toggleable` | `boolean`                                            | Whether or not the heading block is a toggle heading or not. If `true`, then the heading block toggles and can support children. If `false`, then the heading block is a static heading block.                                                                                                                                                                                                                                                                                                                              |

<CodeGroup>
  ```json Example Heading 1 block object theme={null}
  {
    //...other keys excluded
    "type": "heading_1",
    //...other keys excluded
    "heading_1": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
          "link": null
        }
      }],
      "color": "default",
      "is_toggleable": false
    }
  }
  ```
</CodeGroup>

<CodeGroup>
  ```json Example Heading 2 block object theme={null}
  {
    //...other keys excluded
    "type": "heading_2",
    //...other keys excluded
    "heading_2": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
          "link": null
        }
      }],
      "color": "default",
      "is_toggleable": false
    }
  }
  ```
</CodeGroup>

<CodeGroup>
  ```json Example Heading 3 block object theme={null}
  {
    //...other keys excluded
    "type": "heading_3",
    //...other keys excluded
    "heading_3": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
          "link": null
        }
      }],
      "color": "default",
      "is_toggleable": false
    }
  }
  ```
</CodeGroup>

### Image

Image block objects contain a [file object](/reference/file-object) detailing information about the image.

<CodeGroup>
  ```json Example Image block object theme={null}
  {
    // ... other keys excluded
    "type": "image",
    // ... other keys excluded
    "image": {
      "type": "external",
      "external": {
        "url": "https://website.domain/images/image.png"
      }
    }
  }
  ```
</CodeGroup>

#### Supported external image types

The image must be directly hosted. In other words, the `url` cannot point to a service that retrieves the image. The following image types are supported:

* `.bmp`
* `.gif`
* `.heic`
* `.jpeg`
* `.jpg`
* `.png`
* `.svg`
* `.tif`
* `.tiff`

#### Supported file upload types

See the [file upload reference](/reference/file-upload#file-types-and-sizes) for a list of supported file extensions and content types when attaching a File Upload to a block.

Image blocks only support file types in the "image" section of the table.

### Link Preview

[Link Preview](/guides/link-previews/link-previews) block objects contain the originally pasted `url`:

<CodeGroup>
  ```json Example Link preview block object theme={null}
  {
    //...other keys excluded
    "type": "link_preview",
    //...other keys excluded
    "link_preview": {
      "url": "https://github.com/example/example-repo/pull/1234"
    }
  }
  ```
</CodeGroup>

<Warning>
  The `link_preview` block can only be returned as part of a response. The API does not support creating or appending `link_preview` blocks.
</Warning>

### Mention

A mention block object is a child of a [rich text object](/reference/rich-text) that is nested within a [paragraph block object](/reference/block#paragraph). This block type represents any `@` tag in the Notion UI, for a user, date, Notion page, Notion database, or a miniaturized version of a [Link Preview](/reference/unfurl-attribute-object).

A mention block object contains the following fields:

| Field                                                                                                    | Type                                                                                                     | Description                                                 |
| :------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------- |
| `type`                                                                                                   | `"database"`<br /><br /> `"date"`<br /><br /> `"link_preview"`<br /><br /> `"page"`<br /><br /> `"user"` | A constant string representing the type of the mention.     |
| `"database"`<br /><br /> `"date"`<br /><br /> `"link_preview"`<br /><br /> `"page"`<br /><br /> `"user"` | `object`                                                                                                 | An object with type-specific information about the mention. |

<CodeGroup>
  ```json Example Mention object theme={null}
  {
    //...other keys excluded
    "type": "page",
    "page": {
      "id": "3c612f56-fdd0-4a30-a4d6-bda7d7426309"
    }
  }
  ```
</CodeGroup>

### Numbered list item

Numbered list item block objects contain the following information within the `numbered_list_item` property:

| Field              | Type                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :----------------- | :--------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rich_text`        | `array` of [rich text objects](/reference/rich-text) | The rich text displayed in the `numbered_list_item` block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `color`            | `string` (enum)                                      | The color of the block. Possible values are: <br /><br />- `"blue"` <br />- `"blue_background"` <br />- `"brown"` <br />- `"brown_background"` <br />- `"default"` <br />- `"gray"` <br />- `"gray_background"` <br />- `"green"` <br />- `"green_background"` <br />- `"orange"` <br />- `"orange_background"` <br />- `"yellow"` <br />- `"green"` <br />- `"pink"` <br />- `"pink_background"` <br />- `"purple"` <br />- `"purple_background"` <br />- `"red"` <br />- `"red_background"` <br />- `"yellow_background"` |
| `list_start_index` | `integer` (optional)                                 | The start index of a list, used to represent a list that doesn't start at 1. <br /> Only present on the first item of a list.                                                                                                                                                                                                                                                                                                                                                                                               |
| `list_format`      | `string` (enum) (optional)                           | The type of list format. Possible values are: `"numbers"`, `"letters"`, and `"roman"`. <br /> Only present on the first item of a list.                                                                                                                                                                                                                                                                                                                                                                                     |
| `children`         | `array` of [block objects](/reference/block)         | The nested child blocks (if any) of the `numbered_list_item` block.                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

<CodeGroup>
  ```json Example Numbered list item block theme={null}
  {
    //...other keys excluded
    "type": "numbered_list_item",
    "numbered_list_item": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "Finish reading the docs",
            "link": null
          }
        }
      ],
      "color": "default"
    }
  }
  ```
</CodeGroup>

### Paragraph

Paragraph block objects contain the following information within the `paragraph` property:

| Field       | Type                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------- | :--------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rich_text` | `array` of [rich text objects](/reference/rich-text) | The rich text displayed in the paragraph block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `color`     | `string` (enum)                                      | The color of the block. Possible values are: <br /><br />- `"blue"` <br />- `"blue_background"` <br />- `"brown"` <br />- `"brown_background"` <br />- `"default"` <br />- `"gray"` <br />- `"gray_background"` <br />- `"green"` <br />- `"green_background"` <br />- `"orange"` <br />- `"orange_background"` <br />- `"yellow"` <br />- `"green"` <br />- `"pink"` <br />- `"pink_background"` <br />- `"purple"` <br />- `"purple_background"` <br />- `"red"` <br />- `"red_background"` <br />- `"yellow_background"` |
| `children`  | `array` of [block objects](/reference/block)         | The nested child blocks (if any) of the `paragraph` block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

<CodeGroup>
  ```json Example Paragraph block object theme={null}
  {
    //...other keys excluded
    "type": "paragraph",
    //...other keys excluded
    "paragraph": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
          "link": null
        }
      }],
      "color": "default"
  }
  ```
</CodeGroup>

<CodeGroup>
  ```json Example Paragraph block object with a child Mention block object expandable theme={null}
  {
  //...other keys excluded
  	"type": "paragraph",
    	"paragraph":{
    		"rich_text": [
      		{
        		"type": "mention",
        		"mention": {
          		"type": "date",
          		"date": {
            		"start": "2023-03-01",
            		"end": null,
            		"time_zone": null
          		}
        		},
        		"annotations": {
          		"bold": false,
          		"italic": false,
          		"strikethrough": false,
          		"underline": false,
          		"code": false,
          		"color": "default"
        		},
        		"plain_text": "2023-03-01",
        		"href": null
      		},
      		{
            "type": "text",
        		"text": {
          		"content": " ",
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
        		"plain_text": " ",
        		"href": null
      		}
    		],
    		"color": "default"
    	}
  }
  ```
</CodeGroup>

### PDF

A PDF block object represents a PDF that has been embedded within a Notion page. It contains the following fields:

| Property                            | Type                                                                        | Description                                                                                                                                                                                                                                                  |
| :---------------------------------- | :-------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `caption`                           | `array` of [rich text objects](/reference/rich-text)                        | A caption, if provided, for the PDF block.                                                                                                                                                                                                                   |
| `type`                              | One of: <br /><br />- `"file"` <br />- `"external"` <br />- `"file_upload"` | A constant string representing the type of PDF. `file` indicates a Notion-hosted file, and `external` represents a third-party link. `file_upload` is only valid when providing parameters to attach a [File Upload](/reference/file-upload) to a PDF block. |
| `external` \|`file` \|`file_upload` | [file object](/reference/file-object)                                       | An object containing type-specific information about the PDF.                                                                                                                                                                                                |

<CodeGroup>
  ```json JSON theme={null}
  {
    //...other keys excluded
    "type": "pdf",
    //...other keys excluded
    "pdf": {
      "type": "external",
      "external": {
        "url": "https://website.domain/files/doc.pdf"
      }
    }
  }
  ```
</CodeGroup>

#### Supported file upload types

See the [file upload reference](/reference/file-upload#file-types-and-sizes) for a list of supported file extensions and content types when attaching a File Upload to a block.

PDF blocks only support a type of `.pdf`.

### Quote

Quote block objects contain the following information within the `quote` property:

| Field       | Type                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------- | :--------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rich_text` | `array` of [rich text objects](/reference/rich-text) | The rich text displayed in the quote block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `color`     | `string` (enum)                                      | The color of the block. Possible values are: <br /><br />- `"blue"` <br />- `"blue_background"` <br />- `"brown"` <br />- `"brown_background"` <br />- `"default"` <br />- `"gray"` <br />- `"gray_background"` <br />- `"green"` <br />- `"green_background"` <br />- `"orange"` <br />- `"orange_background"` <br />- `"yellow"` <br />- `"green"` <br />- `"pink"` <br />- `"pink_background"` <br />- `"purple"` <br />- `"purple_background"` <br />- `"red"` <br />- `"red_background"` <br />- `"yellow_background"` |
| `children`  | `array` of [block objects](/reference/block)         | The nested child blocks, if any, of the quote block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

<CodeGroup>
  ```json Example Quote block theme={null}
  {
  	//...other keys excluded
  	"type": "quote",
     //...other keys excluded
     "quote": {
     	"rich_text": [{
        "type": "text",
        "text": {
          "content": "To be or not to be...",
          "link": null
        },
      	//...other keys excluded
      }],
      //...other keys excluded
      "color": "default"
     }
  }
  ```
</CodeGroup>

### Synced block

Similar to the Notion UI, there are two versions of a `synced_block` object: the original block that was created first and doesn't yet sync with anything else, and the duplicate block or blocks synced to the original.

<Note>
  An original synced block must be created before corresponding duplicate block or blocks can be made.
</Note>

#### Original synced block

Original synced block objects contain the following information within the `synced_block` property:

| Field         | Type                                         | Description                                                                                                                  |
| :------------ | :------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `synced_from` | `null`                                       | The value is always `null` to signify that this is an original synced block that does not refer to another block.            |
| `children`    | `array` of [block objects](/reference/block) | The nested child blocks, if any, of the `synced_block` block. These blocks will be mirrored in the duplicate `synced_block`. |

<CodeGroup>
  ```json Example Original synced block theme={null}
  {
      //...other keys excluded
    	"type": "synced_block",
      "synced_block": {
          "synced_from": null,
          "children": [
              {
                  "callout": {
                      "rich_text": [
                          {
                              "type": "text",
                              "text": {
                                  "content": "Callout in synced block"
                              }
                          }
                      ]
                  }
              }
          ]
      }
  }
  ```
</CodeGroup>

#### Duplicate synced block

Duplicate synced block objects contain the following information within the `synced_from` object:

| Field      | Type              | Description                                                                                     |
| :--------- | :---------------- | :---------------------------------------------------------------------------------------------- |
| `type`     | `string` (enum)   | The type of the synced from object.<br /><br /> Possible values are: <br /><br />- `"block_id"` |
| `block_id` | `string` (UUIDv4) | An identifier for the original `synced_block`.                                                  |

<CodeGroup>
  ```json Example Duplicate synced block object theme={null}
  {
      //...other keys excluded
    	"type": "synced_block",
      "synced_block": {
          "synced_from": {
              "block_id": "original_synced_block_id"
          }
      }
  }
  ```
</CodeGroup>

<Warning>
  The API does not supported updating synced block content.
</Warning>

### Table

Table block objects are parent blocks for table row children. Table block objects contain the following fields within the `table` property:

| Field               | Type      | Description                                                                                                                         |
| :------------------ | :-------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| `table_width`       | `integer` | The number of columns in the table. <br /><br />**Note that this cannot be changed via the public API once a table is created.**    |
| `has_column_header` | `boolean` | Whether the table has a column header. If `true`, then the first row in the table appears visually distinct from the other rows.    |
| `has_row_header`    | `boolean` | Whether the table has a header row. If `true`, then the first column in the table appears visually distinct from the other columns. |

<CodeGroup>
  ```json Example Table block object theme={null}
  {
    //...other keys excluded
    "type": "table",
    "table": {
      "table_width": 2,
      "has_column_header": false,
      "has_row_header": false
    }
  }
  ```
</CodeGroup>

<Warning>
  **`table_width` can only be set when the table is first created.**

  Note that the number of columns in a table can only be set when the table is first created. Calls to the Update block endpoint to update `table_width` fail.
</Warning>

#### Table rows

Follow these steps to fetch the `table_row`s of a `table`:

<Steps>
  <Step>
    Get the `table` ID from a query to [Retrieve block children](/reference/get-block-children) for the parent page.
  </Step>

  <Step>
    Get the `table_rows` from a query to Retrieve block children for the `table`.
  </Step>
</Steps>

A `table_row` block object contains the following fields within the `table_row` property:

| Property | Type                                                          | Description                                                                                        |
| :------- | :------------------------------------------------------------ | :------------------------------------------------------------------------------------------------- |
| `cells`  | `array` of array of [rich text objects](/reference/rich-text) | An array of cell contents in horizontal display order. Each cell is an array of rich text objects. |

<CodeGroup>
  ```json Example Table row block object expandable theme={null}
  {
    //...other keys excluded
    "type": "table_row",
    "table_row": {
      "cells": [
        [
          {
            "type": "text",
            "text": {
              "content": "column 1 content",
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
            "plain_text": "column 1 content",
            "href": null
          }
        ],
        [
          {
            "type": "text",
            "text": {
              "content": "column 2 content",
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
            "plain_text": "column 2 content",
            "href": null
          }
        ],
        [
          {
            "type": "text",
            "text": {
              "content": "column 3 content",
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
            "plain_text": "column 3 content",
            "href": null
          }
        ]
      ]
    }
  }
  ```
</CodeGroup>

<Note>
  When creating a table block via the [Append block children](/reference/patch-block-children) endpoint, the `table` must have at least one `table_row` whose `cells` array has the same length as the `table_width`.
</Note>

### Table of contents

Table of contents block objects contain the following information within the `table_of_contents` property:

| Property | Type            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :------- | :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `color`  | `string` (enum) | The color of the block. Possible values are: <br /><br />- `"blue"` <br />- `"blue_background"` <br />- `"brown"` <br />- `"brown_background"` <br />- `"default"` <br />- `"gray"` <br />- `"gray_background"` <br />- `"green"` <br />- `"green_background"` <br />- `"orange"` <br />- `"orange_background"` <br />- `"yellow"` <br />- `"green"` <br />- `"pink"` <br />- `"pink_background"` <br />- `"purple"` <br />- `"purple_background"` <br />- `"red"` <br />- `"red_background"` <br />- `"yellow_background"` |

<CodeGroup>
  ```json Example Table of contents block object theme={null}
  {
    //...other keys excluded
  	"type": "table_of_contents",
    "table_of_contents": {
    	"color": "default"
    }
  }
  ```
</CodeGroup>

### Template

<Danger>
  **Deprecation Notice**

  As of March 27, 2023 creation of template blocks will no longer be supported.
</Danger>

Template blocks represent [template buttons](https://www.notion.so/help/template-buttons) in the Notion UI.

Template block objects contain the following information within the `template` property:

| Field       | Type                                                 | Description                                                                                                                    |
| :---------- | :--------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `rich_text` | `array` of [rich text objects](/reference/rich-text) | The rich text displayed in the title of the template.                                                                          |
| `children`  | `array` of [block objects](/reference/block)         | The nested child blocks, if any, of the template block. These blocks are duplicated when the template block is used in the UI. |

<CodeGroup>
  ```json Example Template block object theme={null}
  {
    //...other keys excluded
    "template": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "Add a new to-do",
            "link": null
          },
          "annotations": {
            //...other keys excluded
          },
          "plain_text": "Add a new to-do",
          "href": null
        }
      ]
    }
  }
  ```
</CodeGroup>

### To do

To do block objects contain the following information within the `to_do` property:

| Field       | Type                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------- | :--------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rich_text` | `array` of [rich text objects](/reference/rich-text) | The rich text displayed in the To do block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `checked`   | `boolean` (optional)                                 | Whether the To do is checked.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `color`     | `string` (enum)                                      | The color of the block. Possible values are: <br /><br />- `"blue"` <br />- `"blue_background"` <br />- `"brown"` <br />- `"brown_background"` <br />- `"default"` <br />- `"gray"` <br />- `"gray_background"` <br />- `"green"` <br />- `"green_background"` <br />- `"orange"` <br />- `"orange_background"` <br />- `"yellow"` <br />- `"green"` <br />- `"pink"` <br />- `"pink_background"` <br />- `"purple"` <br />- `"purple_background"` <br />- `"red"` <br />- `"red_background"` <br />- `"yellow_background"` |
| `children`  | `array` of [block objects](/reference/block)         | The nested child blocks, if any, of the To do block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

<CodeGroup>
  ```json Example To do block object theme={null}
  {
    //...other keys excluded
    "type": "to_do",
    "to_do": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Finish Q3 goals",
          "link": null
        }
      }],
      "checked": false,
      "color": "default",
      "children":[{
        "type": "paragraph"
        // ..other keys excluded
      }]
    }
  }
  ```
</CodeGroup>

### Toggle blocks

Toggle block objects contain the following information within the `toggle` property:

| Field       | Type                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------- | :--------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rich_text` | `array` of [rich text objects](/reference/rich-text) | The rich text displayed in the Toggle block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `color`     | `string` (enum)                                      | The color of the block. Possible values are: <br /><br />- `"blue"` <br />- `"blue_background"` <br />- `"brown"` <br />- `"brown_background"` <br />- `"default"` <br />- `"gray"` <br />- `"gray_background"` <br />- `"green"` <br />- `"green_background"` <br />- `"orange"` <br />- `"orange_background"` <br />- `"yellow"` <br />- `"green"` <br />- `"pink"` <br />- `"pink_background"` <br />- `"purple"` <br />- `"purple_background"` <br />- `"red"` <br />- `"red_background"` <br />- `"yellow_background"` |
| `children`  | `array` of [block objects](/reference/block)         | The nested child blocks, if any, of the Toggle block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

<CodeGroup>
  ```json Toggle Block theme={null}
  {
    //...other keys excluded
    "type": "toggle",
    "toggle": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Additional project details",
          "link": null
        }
        //...other keys excluded
      }],
      "color": "default",
      "children":[{
        "type": "paragraph"
        // ..other keys excluded
      }]
    }
  }
  ```
</CodeGroup>

### Video

Video block objects contain a [file object](/reference/file-object) detailing information about the video.

<CodeGroup>
  ```json Example Video block object theme={null}
  {
    "type": "video",
    //...other keys excluded
    "video": {
      "type": "external",
      "external": {
        "url": "https://companywebsite.com/files/video.mp4"
      }
    }
  }
  ```
</CodeGroup>

#### Supported video types

* `.amv`
* `.asf`
* `.avi`
* `.f4v`
* `.flv`
* `.gifv`
* `.mkv`
* `.mov`
* `.mpg`
* `.mpeg`
* `.mpv`
* `.mp4`
* `.m4v`
* `.qt`
* `.wmv`
* YouTube video links that include `embed` or `watch`. E.g. `https://www.youtube.com/watch?v=[id]`, `https://www.youtube.com/embed/[id]`

<Note>
  Vimeo video links are not currently supported by the video block type. However, they can be embedded in Notion pages using the `embed` block type. See [Embed](/reference/block#embed) for more information.
</Note>

#### Supported file upload types

See the [file upload reference](/reference/file-upload#file-types-and-sizes) for a list of supported file extensions and content types when attaching a File Upload to a block.

Video blocks only support file types in the "video" section of the table.

---

> ## Documentation Index
> Fetch the complete documentation index at: https://developers.notion.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Page

> The Page object contains the [page property values](/reference/page-property-values) of a single Notion page.

<CodeGroup>
  ```json Example page object expandable theme={null}
  {
      "object": "page",
      "id": "be633bf1-dfa0-436d-b259-571129a590e5",
      "created_time": "2022-10-24T22:54:00.000Z",
      "last_edited_time": "2023-03-08T18:25:00.000Z",
      "created_by": {
          "object": "user",
          "id": "c2f20311-9e54-4d11-8c79-7398424ae41e"
      },
      "last_edited_by": {
          "object": "user",
          "id": "9188c6a5-7381-452f-b3dc-d4865aa89bdf"
      },
      "cover": null,
      "icon": {
          "type": "emoji",
          "emoji": "🐞"
      },
      "parent": {
          "type": "database_id",
          "database_id": "a1d8501e-1ac1-43e9-a6bd-ea9fe6c8822b"
      },
      "archived": true,
      "in_trash": true,
      "properties": {
          "Due date": {
              "id": "M%3BBw",
              "type": "date",
              "date": {
                  "start": "2023-02-23",
                  "end": null,
                  "time_zone": null
              }
          },
          "Status": {
              "id": "Z%3ClH",
              "type": "status",
              "status": {
                  "id": "86ddb6ec-0627-47f8-800d-b65afd28be13",
                  "name": "Not started",
                  "color": "default"
              }
          },
          "Title": {
              "id": "title",
              "type": "title",
              "title": [
                  {
                      "type": "text",
                      "text": {
                          "content": "Bug bash",
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
                      "plain_text": "Bug bash",
                      "href": null
                  }
              ]
          }
      },
      "url": "https://www.notion.so/Bug-bash-be633bf1dfa0436db259571129a590e5",
  		"public_url": "https://jm-testing.notion.site/p1-6df2c07bfc6b4c46815ad205d132e22d"
  }
  ```
</CodeGroup>

All pages have a [Parent](/reference/parent-object). If the parent is a [data source](/reference/data-source), the property values conform to the schema laid out in the data source's [properties](/reference/property-object). Otherwise, the only property value is the `title`.

Page content is available as [blocks](/reference/block). The content can be read using [retrieve block children](/reference/get-block-children) and appended using [append block children](/reference/patch-block-children).

## Page object properties

<Note>
  Properties marked with an \* are available to integrations with any capabilities. Other properties require read content capabilities in order to be returned from the Notion API. For more information on integration capabilities, see the [capabilities guide](/reference/capabilities).
</Note>

| Property           | Type                                                                                                                                       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Example value                                                                            |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------- |
| `object`\*         | `string`                                                                                                                                   | Always `"page"`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `"page"`                                                                                 |
| `id`\*             | `string` (UUIDv4)                                                                                                                          | Unique identifier of the page.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `"45ee8d13-687b-47ce-a5ca-6e2e45548c4b"`                                                 |
| `created_time`     | `string` ([ISO 8601 date and time](https://en.wikipedia.org/wiki/ISO_8601))                                                                | Date and time when this page was created. Formatted as an [ISO 8601 date time](https://en.wikipedia.org/wiki/ISO_8601) string.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `"2020-03-17T19:10:04.968Z"`                                                             |
| `created_by`       | [Partial User](/reference/user)                                                                                                            | User who created the page.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `{"object": "user","id": "45ee8d13-687b-47ce-a5ca-6e2e45548c4b"}`                        |
| `last_edited_time` | `string` ([ISO 8601 date and time](https://en.wikipedia.org/wiki/ISO_8601))                                                                | Date and time when this page was updated. Formatted as an [ISO 8601 date time](https://en.wikipedia.org/wiki/ISO_8601) string.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `"2020-03-17T19:10:04.968Z"`                                                             |
| `last_edited_by`   | [Partial User](/reference/user)                                                                                                            | User who last edited the page.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `{"object": "user","id": "45ee8d13-687b-47ce-a5ca-6e2e45548c4b"}`                        |
| `archived`         | `boolean`                                                                                                                                  | The archived status of the page.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `false`                                                                                  |
| `in_trash`         | `boolean`                                                                                                                                  | Whether the page is in Trash.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `false`                                                                                  |
| `icon`             | [File Object](/reference/file-object) (`type` of `"external"` or `"file_upload"` are supported) or [Emoji object](/reference/emoji-object) | Page icon.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |                                                                                          |
| `cover`            | [File object](/reference/file-object) (`type` of `"external"` or `"file_upload"` are supported)                                            | Page cover image.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |                                                                                          |
| `properties`       | `object`                                                                                                                                   | Property values of this page. As of version `2022-06-28`, `properties` only contains the ID of the property; in prior versions `properties` contained the values as well. <br /> <br /> If `parent.type` is `"page_id"` or `"workspace"`, then the only valid key is `title`. <br /> <br /> If `parent.type` is `"data_source_id"`, then the keys and values of this field are determined by the [`properties`](/reference/property-object) of the [data source](/reference/data-source) this page belongs to.<br /> <br /> `key` string Name of a property as it appears in Notion.<br /> <br /> `value` object See [Property value object](/reference/property-value-object). | `{ "id": "A%40Hk" }`                                                                     |
| `parent`           | `object`                                                                                                                                   | Information about the page's parent. See [Parent object](/reference/parent-object).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `{ "type": "data_source_id", "data_source_id": "d9824bdc-8445-4327-be8b-5b47500af6ce" }` |
| `url`              | `string`                                                                                                                                   | The URL of the Notion page.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `"https://www.notion.so/Avocado-d093f1d200464ce78b36e58a3f0d8043"`                       |
| `public_url`       | `string`                                                                                                                                   | The public page URL if the page has been published to the web. Otherwise, `null`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `"https://jm-testing.notion.site/p1-6df2c07bfc6b4c46815ad205d132e22d"1`                  |

---

> ## Documentation Index
> Fetch the complete documentation index at: https://developers.notion.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Page properties

## Overview

A [page object](/reference/page) is made up of page properties that contain data about the page.

When you send a request to [Create a page](/reference/post-page), set the page properties in the `properties` object body parameter.

[Retrieve a page](/reference/retrieve-a-page) surfaces the identifier, type, and value of a page’s properties.

[Retrieve a page property item](/reference/retrieve-a-page-property) returns information about a single property ID. Especially for formulas, rollups, and relations, Notion recommends using this API to ensure you get an accurate, up-to-date property value that isn't truncating any results. Refer to [Page property items](/reference/property-item-object) for specific API shape details when using this endpoint.

An [Update page](/reference/patch-page) query modifies the page property values specified in the `properties` object body param.

<Check>
  **Pages that live in a data source are easier to query and manage.**

  **Page properties** are most useful when interacting with a page that is an entry in a data source, represented as a row in the Notion app UI.

  If a page is not part of a data source, then its only available property is its `title`.
</Check>

## Attributes

Each page property value object contains the following fields:

| Field                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Type            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Example value      |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------- |
| `id`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `string`        | An underlying identifier for the property. Historically, this may be a UUID, but newer IDs are a short ID that's always URL-encoded in the API and in [integration webhooks](/reference/webhooks).<br /><br /> `id` may be used in place of name when creating or updating pages.<br /><br /> `id` remains constant when the property name changes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `"f%5C%5C%3Ap"`    |
| `type`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `string` (enum) | The type of the property in the page object. Possible type values are: <br /> <br />- [`checkbox`](#checkbox) <br /> - [`created_by`](#created-by) <br />- [`created_time`](#created-time) <br /> - [`date`](#date) <br /> - [`email`](#email)<br /> - [`files`](#files) <br />- [`formula`](#formula)<br /> - [`last_edited_by`](#last-edited-by) <br />- [`last_edited_time`](#last-edited-time)<br /> - [`multi_select`](#multi-select)<br /> - [`number`](#number)<br /> - [`people`](#people)<br /> - [`phone_number`](#phone-number)<br /> - [`relation`](#relation) - [`rollup`](#rollup)<br /> - [`rich_text`](#rich-text) <br />- [`select`](#select) <br />- [`status`](#status)<br /> - [`title`](#title)<br /> - [`url`](#url) <br />- [`unique_id`](#unique-id)<br /> - [`verification`](#verification)Refer to specific type sections below for details on type-specific values. | `"rich_text"`      |
| [`checkbox`](#checkbox)<br />[`created_by`](#created-by)<br />[`created_time`](#created-time)<br />[`date`](#date)<br />[`email`](#email)<br />[`files`](#files)<br />[`formula`](#formula)<br />[`last_edited_by`](#last-edited-by)<br />[`last_edited_time`](#last-edited-time)<br />[`multi_select`](#multi-select)<br />[`number`](#number)<br />[`people`](#people)<br />[`phone_number`](#phone-number)<br />[`relation`](#relation)<br />[`rollup`](#rollup)<br />[`rich_text`](#rich-text)<br />[`select`](#select)[`status`](#status)<br />[`title`](#title)<br />[`url`](#url)[`unique_id`](#unique-id)<br />[`verification`](#verification) | `object`        | A type object that contains data specific to the page property type, including the page property value.<br /><br /> Refer to the [type objects section](#type-objects) for descriptions and examples of each type.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `"checkbox": true` |

<Info>
  **Size limits for page property values**

  For information about size limitations for specific page property objects, refer to the [limits for property values documentation](/reference/request-limits#limits-for-property-values).
</Info>

When returned from the [Retrieve page property item](/changelog/retrieve-page-property-values) API, there's an additional field, `object`, which is always the string `"property_item"`, as described in [Page property items](/reference/property-item-object).

## Type objects

### Checkbox

| Field      | Type      | Description                                                      | Example value |
| :--------- | :-------- | :--------------------------------------------------------------- | :------------ |
| `checkbox` | `boolean` | Whether the checkbox is checked (`true`) or unchecked (`false`). | `true`        |

#### Example `properties` body param for a POST or PATCH page request that creates or updates a `checkbox` page property value

<CodeGroup>
  ```json JSON theme={null}
  {
    "properties": {
      "Task completed": {
        "checkbox": true
      }
    }
  }
  ```
</CodeGroup>

#### Example `checkbox` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Task completed": {
      "id": "ZI%40W",
      "type": "checkbox",
      "checkbox": true
    }
  }
  ```
</CodeGroup>

### Created by

| Field        | Type     | Description                                                                                                                             | Example value                                |
| :----------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------- |
| `created_by` | `object` | A [user object](/reference/user) containing information about the user who created the page. <br /><br />`created_by` can’t be updated. | Refer to the example response objects below. |

#### Example `created_by` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "created_by": {
      "object": "user",
      "id": "c2f20311-9e54-4d11-8c79-7398424ae41e"
    }
  }
  ```
</CodeGroup>

### Created time

| Field          | Type                                                                        | Description                                                                                          | Example value                |
| :------------- | :-------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- | :--------------------------- |
| `created_time` | `string` ([ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date and time) | The date and time that the page was created. <br /><br /> The `created_time` value can’t be updated. | `"2022-10-12T16:34:00.000Z"` |

#### Example `created_time` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Created time": {
      "id": "eB_%7D",
      "type": "created_time",
      "created_time": "2022-10-24T22:54:00.000Z"
    }
  }
  ```
</CodeGroup>

### Date

If the `type` of a page property value is `"date"`, then the property value contains a `"date"` object with the following fields:

| Field   | Type                                                                        | Description                                                                                                                       | Example value            |
| :------ | :-------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- | :----------------------- |
| `end`   | `string` ([ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date and time) | (Optional) A string representing the end of a date range.<br /><br /> If the value is `null`, then the date value is not a range. | `"2020-12-08T12:00:00Z"` |
| `start` | `string` ([ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date and time) | A date, with an optional time.<br /><br /> If the `date` value is a range, then `start` represents the start of the range.        | `"2020-12-08T12:00:00Z”` |

#### Example `properties` body param for a POST or PATCH page request that creates or updates a date page property value

<CodeGroup>
  ```json JSON theme={null}
  {
    "properties": {
      "Due date": {
        "date": {
          "start": "2023-02-23"
        }
      }
    }
  }
  ```
</CodeGroup>

#### Example `date` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Due date": {
      "id": "M%3BBw",
      "type": "date",
      "date": {
        "start": "2023-02-07",
        "end": null,
        "time_zone": null
      }
    }
  }
  ```
</CodeGroup>

### Email

| Field   | Type     | Description                                                                              | Example value |
| :------ | :------- | :--------------------------------------------------------------------------------------- | :------------ |
| `email` | `string` | A string describing an email address."[ada@makenotion.com](mailto:ada@makenotion.com)"\` |               |

#### Example `properties` body param for a POST or PATCH page request that creates or updates an `email` page property value

<CodeGroup>
  ```json JSON theme={null}
  {
    "properties": {
      "Email": {
        "email": "ada@makenotion.com"
      }
    }
  }
  ```
</CodeGroup>

#### Example `email` page property value as returned in a GET page request

<CodeGroup>
  ```json json theme={null}
  {
    "Email": {
      "id": "y%5C%5E_",
      "type": "email",
      "email": "ada@makenotion.com"
    }
  }
  ```
</CodeGroup>

### Files

| Field   | Type                                            | Description                                                 | Example value                                |
| :------ | :---------------------------------------------- | :---------------------------------------------------------- | :------------------------------------------- |
| `files` | array of [file objects](/reference/file-object) | An array of objects containing information about the files. | Refer to the example response objects below. |

#### Example creation or update of `files` property

The following is an example `properties` body parameter for a `POST` or `PATCH` page request that creates or updates a `files` page property value.

When providing an `external` URL, the `name` parameter is required.

When providing a `file_upload`, the `name` is optional and defaults to the `filename` of the original [File Upload](/reference/file-upload).

<CodeGroup>
  ```json JSON theme={null}
  {
    "properties": {
      "Blueprint": {
        "files": [
          {
            "name": "Project Alpha blueprint",
            "external": {
              "url": "https://www.figma.com/file/g7eazMtXnqON4i280CcMhk/project-alpha-blueprint?node-id=0%3A1&t=nXseWIETQIgv31YH-1"
            }
          }
        ]
      }
    }
  }
  ```
</CodeGroup>

#### Example `files` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Blueprint": {
      "id": "tJPS",
      "type": "files",
      "files": [
        {
          "name": "Project blueprint",
          "type": "external",
          "external": {
            "url": "https://www.figma.com/file/g7eazMtXnqON4i280CcMhk/project-alpha-blueprint?node-id=0%3A1&t=nXseWIETQIgv31YH-1"
          }
        }
      ]
    }
  }
  ```
</CodeGroup>

<Info>
  **Array parameter overwrites the entire existing value**

  When updating a `files` page property value, the value is overwritten by the new array of `files` passed.

  If you pass a `file` object containing a file hosted by Notion, it remains one of the files. To remove any file, don't pass it in the update request.
</Info>

### Formula

Formula property value objects represent the result of evaluating a formula described in the [data source's properties](/reference/data-source).

If the `type` of a page property value is `"formula"`, then the property value contains a `"formula"` object with the following fields:

| Field                                             | Type                                              | Description                                                                                                                            | Example value |
| :------------------------------------------------ | :------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `boolean` \|\| `date` \|\| `number` \|\| `string` | `boolean` \|\| `date` \|\| `number` \|\| `string` | The value of the result of the formula. The value can’t be updated directly via the API.                                               | 42            |
| `type`                                            | `string` (enum)                                   | A string indicating the data type of the result of the formula. Possible `type` values are: - `boolean` - `date` - `number` - `string` | `"number"`    |

#### Example `formula` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Days until launch": {
      "id": "CSoE",
      "type": "formula",
      "formula": {
        "type": "number",
        "number": 56
      }
    }
  }
  ```
</CodeGroup>

<Info>
  The [Retrieve a page endpoint](/reference/retrieve-a-page) returns a maximum of 25 inline page or person references for a `formula` property. If a `formula` property includes more than 25 references, then you can use the [Retrieve a page property item endpoint](/reference/retrieve-a-page-property) for the specific `formula` property to get its complete list of references.
</Info>

### Icon

<Info>
  **Page icon and cover are not nested under `properties`**

  The `icon` and `cover` parameters and fields in the [Create a page](/reference/post-page) and [Update page properties](/reference/patch-page) APIs are top-level are not nested under `properties`.
</Info>

| Field  | Type      | Description | Example value                                |
| :----- | :-------- | :---------- | :------------------------------------------- |
| `icon` | an object | Icon object | Refer to the example response objects below. |

#### Example emoji `icon` property value as returned in GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "icon": {
      "type": "emoji",
      "emoji":"😀"
    }
  }
  ```
</CodeGroup>

#### Example uploaded `icon` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "icon": {
      "type":"file",
      "file": {
        "url": "https://local-files-secure.s3.us-west-2.amazonaws.com/13950b26-c203-4f3b-b97d-93ec06319565/a7084c4c-3e9a-4324-af99-34e0cb7f8fe7/notion.jpg?...",
        "expiry_time": "2024-12-03T19:44:56.932Z"
      }
    }
  }
  ```
</CodeGroup>

#### Example updating a page icon to an uploaded file

After uploading an image using the [File Upload API](/reference/file-upload#file-types-and-sizes), use the File Upload's ID in the [Create a page](/reference/post-page) or [Update page properties](/reference/patch-page) API to attach it as a page icon. For example:

<CodeGroup>
  ```json JSON theme={null}
  {
    "icon": {
      "type": "file_upload",
      "file_upload": {
        "id": "43833259-72ae-404e-8441-b6577f3159b4"
      }
    }
  }
  ```
</CodeGroup>

To attach a file upload as a page cover rather than an icon, use the create or update page APIs with the `cover` parameter, nesting a `file_upload` parameter the same way as the `icon` example.

### Last edited by

| Field            | Type     | Description                                                                                                                          | Example value                                |
| :--------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------- |
| `last_edited_by` | `object` | A [user object](/reference/user) containing information about the user who last updated the page. `last_edited_by` can’t be updated. | Refer to the example response objects below. |

#### Example `last_edited_by` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Last edited by column name": {
      "id": "uGNN",
      "type": "last_edited_by",
      "last_edited_by": {
        "object": "user",
        "id": "9188c6a5-7381-452f-b3dc-d4865aa89bdf",
        "name": "Test Integration",
        "avatar_url": "https://s3-us-west-2.amazonaws.com/public.notion-static.com/3db373fe-18f6-4a3c-a536-0f061cb9627f/leplane.jpeg",
        "type": "bot",
        "bot": {}
      }
    }
  }
  ```
</CodeGroup>

### Last edited time

| Field              | Type                                                                        | Description                                                                                     | Example value                |
| :----------------- | :-------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- | :--------------------------- |
| `last_edited_time` | `string` ([ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date and time) | The date and time that the page was last edited. The `last_edited_time` value can’t be updated. | `"2022-10-12T16:34:00.000Z"` |

#### Example `last_edited_time` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Last edited time": {
      "id": "%3Defk",
      "type": "last_edited_time",
      "last_edited_time": "2023-02-24T21:06:00.000Z"
    }
  }
  ```
</CodeGroup>

### Multi-select

If the `type` of a page property value is `"multi_select"`, then the property value contains a `"multi_select"` array with the following fields:

| Field   | Type            | Description                                                                                                                                                                                                                                                                                                                                                                | Example value                            |
| :------ | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| `color` | `string` (enum) | Color of the option. Note: the `color` value can’t be updated via the API. <br /><br /> Possible `"color"` values are: <br /><br /> - `blue`<br /> - `brown`<br /> - `default`(the default value)<br /> - `gray`<br /> - `green`<br /> - `orange`<br /> - `pink`<br /> - `purple`<br /> - `red`<br /> - `yellow`                                                           | `"red"`                                  |
| `id`    | `string`        | The ID of the option. <br /><br /> You can use `id` or `name` to update a multi-select property.                                                                                                                                                                                                                                                                           | `"b3d773ca-b2c9-47d8-ae98-3c2ce3b2bffb"` |
| `name`  | `string`        | The name of the option as it appears in Notion. <br /><br /> If the multi-select [data source property](/reference/property-object) does not yet have an option by that name, then the name will be added to the data source schema if the integration also has write access to the parent data source. <br /><br /> Note: Commas (`","`) are not valid for select values. | `"JavaScript"`                           |

#### Example `properties` body param for a POST or PATCH page request that creates or updates a `multi_select` page property value

<CodeGroup>
  ```json JSON theme={null}
  {
    "properties": {
      "Programming language": {
        "multi_select": [
          {
            "name": "TypeScript"
          },
          {
            "name": "Python"
          }
        ]
      }
    }
  }
  ```
</CodeGroup>

#### Example `multi_select` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Programming language": {
      "id": "QyRn",
      "name": "Programming language",
      "type": "multi_select",
      "multi_select": [
        {
          "id": "tC;=",
          "name": "TypeScript",
          "color": "purple"
        },
        {
          "id": "e4413a91-9f84-4c4a-a13d-5b4b3ef870bb",
          "name": "JavaScript",
          "color": "red"
        },
        {
          "id": "fc44b090-2166-40c8-8c58-88f2d8085ec0",
          "name": "Python",
          "color": "gray"
        }
      ]
    }
  }
  ```
</CodeGroup>

<Info>
  If you want to add a new option to a multi-select property via the [Update page](/reference/patch-page) or [Update data source](/reference/update-a-data-source) endpoint, then your integration needs write access to the parent database.
</Info>

### Number

| Field    | Type     | Description                       | Example value |
| :------- | :------- | :-------------------------------- | :------------ |
| `number` | `number` | A number representing some value. | `1234`        |

#### Example `properties` body param for a POST or PATCH page request that creates or updates a `number` page property value

<CodeGroup>
  ```json JSON theme={null}
  {
    "properties": {
      "Number of subscribers": {
        "number": 42
      }
    }
  }
  ```
</CodeGroup>

#### Example `number` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Number of subscribers": {
      "id": "WPj%5E",
      "name": "Number of subscribers",
      "type": "number",
      "number": {
        "format": "number"
      }
    }
  }
  ```
</CodeGroup>

### People

| Field    | Type                                     | Description               | Example value                                |
| :------- | :--------------------------------------- | :------------------------ | :------------------------------------------- |
| `people` | array of [user objects](/reference/user) | An array of user objects. | Refer to the example response objects below. |

#### Example `properties` body param for a POST or PATCH page request that creates or updates a `people` page property value

<CodeGroup>
  ```json JSON theme={null}
  {
    "properties": {
      "Stakeholders": {
        "people": [{
          "object": "user",
          "id": "c2f20311-9e54-4d11-8c79-7398424ae41e"
        }]
      }
    }
  }
  ```
</CodeGroup>

#### Example `people` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Stakeholders": {
      "id": "%7BLUX",
      "type": "people",
      "people": [
        {
          "object": "user",
          "id": "c2f20311-9e54-4d11-8c79-7398424ae41e",
          "name": "Kimberlee Johnson",
          "avatar_url": null,
          "type": "person",
          "person": {
            "email": "[email protected]"
          }
        }
      ]
    }
  }
  ```
</CodeGroup>

<Info>
  **Retrieve individual property items to avoid truncation**

  The [Retrieve a page endpoint](/reference/retrieve-a-page) can’t be guaranteed to return more than 25 people per `people` page property. If a `people` page property includes more than 25 people, then you can use the [Retrieve a page property item endpoint](/reference/retrieve-a-page-property) for the specific `people` property to get a complete list of people.
</Info>

### Phone number

| Field          | Type     | Description                                                               | Example value    |
| :------------- | :------- | :------------------------------------------------------------------------ | :--------------- |
| `phone_number` | `string` | A string representing a phone number. No phone number format is enforced. | `"415-867-5309"` |

#### Example `properties` body param for a POST or PATCH page request that creates or updates a `phone_number` page property value

<CodeGroup>
  ```json JSON theme={null}
  {
    "properties": {
      "Contact phone number": {
        "phone_number": "415-202-4776"
      }
    }
  }
  ```
</CodeGroup>

#### Example `phone_number` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Example phone number property": {
      "id": "%5DKhQ",
      "name": "Example phone number property",
      "type": "phone_number",
      "phone_number": {}
    }
  }
  ```
</CodeGroup>

### Relation

| Field      | Type                        | Description                                                                                                                                                                                   | Example value                                |
| :--------- | :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------- |
| `has_more` | `boolean`                   | If a `relation` has more than 25 references, then the `has_more` value for the relation in the response object is `true`. If a relation doesn’t exceed the limit, then `has_more` is `false`. | Refer to the example response objects below. |
| `relation` | an array of page references | An array of related page references. A page reference is an object with an `id` key and a string value corresponding to a page ID in another data source.                                     | Refer to the example response objects below. |

#### Example `properties` body param for a POST or PATCH page request that creates or updates a `relation` page property value

<CodeGroup>
  ```json JSON theme={null}
  {
    "properties": {
      "Related tasks": {
        "relation": [
          {
            "id": "dd456007-6c66-4bba-957e-ea501dcda3a6"
          },
          {
            "id": "0c1f7cb2-8090-4f18-924e-d92965055e32"
          }
        ]
      }
    }
  }
  ```
</CodeGroup>

#### Example `relation` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Related tasks": {
      "id": "hgMz",
      "type": "relation",
      "relation": [
        {
          "id": "dd456007-6c66-4bba-957e-ea501dcda3a6"
        },
        {
          "id": "0c1f7cb2-8090-4f18-924e-d92965055e32"
        }
      ],
      "has_more": false
    }
  }
  ```
</CodeGroup>

<Info>
  **To update a `relation` property value via the API, share the related parent database with the integration.**

  If a `relation` property value is unexpectedly empty, then make sure that you have shared the original source database for the data source that the `relation` points to with the integration.

  Ensuring correct permissions is also important for complete results for `rollup` and `formula` properties.
</Info>

### Rollup

If the `type` of a page property value is `"rollup"`, then the property value contains a `"rollup"` object with the following fields:

| Field                                                                  | Type                                                                                                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Example value |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `array` \|\| `date` \|\| `incomplete` \|\| `number` \|\| `unsupported` | Corresponds to the field. <br /><br /> For example, if the field is `number`, then the type of the value is `number`. | The value of the calculated rollup. The value can't be directly updated via the API.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `1234`        |
| `function`                                                             | `string` (enum)                                                                                                       | The function that is evaluated for every page in the relation of the rollup. Possible `"function"` values are: <br /><br />- `average` <br />- `checked` <br />- `count` <br />- `count_per_group` <br />- `count_values` <br />- `date_range` <br />- `earliest_date` <br />- `empty` <br />- `latest_date` <br />- `max` <br />- `median` <br />- `min` <br />- `not_empty` <br />- `percent_checked` <br />- `percent_empty` <br />- `percent_not_empty` <br />- `percent_per_group` <br />- `percent_unchecked` <br />- `range` <br />- `show_original` <br />- `show_unique` <br />- `sum` <br />- `unchecked` <br />- `unique` | `"sum"`       |
| `type`                                                                 | `array` \|\| `date` \|\| `incomplete` \|\| `number` \|\| `unsupported`                                                | The value type of the calculated rollup.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `number`      |

#### Example `rollup` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Number of units": {
      "id": "hgMz",
      "type": "rollup",
      "rollup": {
        "type": "number",
        "number": 2,
        "function": "count"
      }
    }
  }
  ```
</CodeGroup>

<Warning>
  **For rollup properties with more than 25 references, use the Retrieve a page property endpoint**

  Both the [Retrieve a page](/reference/retrieve-a-page) and [Retrieve a page property](/reference/retrieve-a-page-property) endpoints will return information related to the page properties. In cases where a rollup property has more than 25 references, the [Retrieve a page property](/reference/retrieve-a-page-property) endpoint must but used.

  Learn more about rollup properties in Notion’s [Help Center](/reference/page-property-values#rollup).
</Warning>

<Warning>
  **The API does not support updating `rollup` page property values.**

  To change a page's `rollup` property, use the Notion UI.
</Warning>

### Rich text

| Field       | Type                                                  | Description                                           | Example value                                |
| :---------- | :---------------------------------------------------- | :---------------------------------------------------- | :------------------------------------------- |
| `rich_text` | an array of [rich text objects](/reference/rich-text) | An array of [rich text objects](/reference/rich-text) | Refer to the example response objects below. |

#### Example `properties` body param for a POST or PATCH page request that creates or updates a `rich_text` page property value

<CodeGroup>
  ```json JSON expandable theme={null}
  {
    "properties": {
      "Description": {
        "rich_text": [
          {
            "type": "text",
            "text": {
              "content": "There is some ",
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
            "plain_text": "There is some ",
            "href": null
          },
          {
            "type": "text",
            "text": {
              "content": "text",
              "link": null
            },
            "annotations": {
              "bold": true,
              "italic": false,
              "strikethrough": false,
              "underline": false,
              "code": false,
              "color": "default"
            },
            "plain_text": "text",
            "href": null
          },
          {
            "type": "text",
            "text": {
              "content": " in this property!",
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
            "plain_text": " in this property!",
            "href": null
          }
        ]
      }
    }
  }
  ```
</CodeGroup>

#### Example `rich_text` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON expandable theme={null}
  {
    "Description": {
      "id": "HbZT",
      "type": "rich_text",
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "There is some ",
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
          "plain_text": "There is some ",
          "href": null
        },
        {
          "type": "text",
          "text": {
            "content": "text",
            "link": null
          },
          "annotations": {
            "bold": true,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          },
          "plain_text": "text",
          "href": null
        },
        {
          "type": "text",
          "text": {
            "content": " in this property!",
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
          "plain_text": " in this property!",
          "href": null
        }
      ]
    }
  }
  ```
</CodeGroup>

<Info>
  The [Retrieve a page endpoint](/reference/retrieve-a-page) returns a maximum of 25 populated inline page or person references for a `rich_text` property. If a `rich_text` property includes more than 25 references, then you can use the [Retrieve a page property item endpoint](/reference/retrieve-a-page-property) for the specific `rich_text` property to get its complete list of references.
</Info>

### Select

If the type of a page property value is `select`, then the property value contains a `select` object with the following fields:

| Property | Type            | Description                                                                                                                                                                                                                                                                                                                                                    | Example value                           |
| :------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------- |
| `color`  | `string` (enum) | The color of the option. Possible `"color"` values are: <br /><br />- `blue`<br /> - `brown`<br /> - `default`<br /> - `gray`<br /> - `green`<br /> - `orange`<br /> - `pink`<br /> - `purple`<br /> - `red`<br /> - `yellow`<br /><br />Defaults to `default`. The `color` value can’t be updated via the API.                                                | `red`                                   |
| `id`     | `string`        | The ID of the option. <br /><br /> You can use `id` or `name` to [update](/reference/patch-page) a select property.                                                                                                                                                                                                                                            | `"b3d73ca-b2c9-47d8-ae98-3c2ce3b2bffb"` |
| `name`   | `string`        | The name of the option as it appears in Notion. <br /><br /> If the select [data source property](/reference/property-object) doesn't have an option by that name yet, then the name is added to the data source schema if the integration also has write access to the parent data source. <br /><br /> Note: Commas (`","`) are not valid for select values. | `"jQuery"`                              |

#### Example `properties` body param for a POST or PATCH page request that creates or updates a `select` page property value

<CodeGroup>
  ```json JSON theme={null}
  {
    "properties": {
      "Department": {
        "select": {
          "name": "Marketing"
        }
      }
    }
  }
  ```
</CodeGroup>

#### Example select page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Department": {
      "id": "Yc%3FJ",
      "type": "select",
      "select": {
        "id": "ou@_",
        "name": "jQuery",
        "color": "purple"
      }
    }
  }
  ```
</CodeGroup>

### Status

If the type of a page property value is `status`, then the property value contains a `status` object with the following fields:

| Property | Type            | Description                                                                                                                                                                                                                                                                                          | Example value                            |
| :------- | :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| `color`  | `string` (enum) | The color of the option. Possible `"color"` values are: <br /><br />- `blue`<br /> - `brown`<br /> - `default`<br /> - `gray`<br /> - `green`<br /> - `orange`<br /> - `pink`<br /> - `purple`<br /> - `red`<br /> - `yellow` Defaults to `default`. The `color` value can’t be updated via the API. | `"red"`                                  |
| `id`     | `string`        | `string`                                                                                                                                                                                                                                                                                             | `"b3d773ca-b2c9-47d8-ae98-3c2ce3b2bffb"` |
| `name`   | `string`        | The name of the option as it appears in Notion.                                                                                                                                                                                                                                                      | `"In progress"`                          |

#### Example `properties` body param for a POST or PATCH page request that creates or updates a `status` page property value

<CodeGroup>
  ```json JSON theme={null}
  {
    "properties": {
      "Status": {
        "status": {
          "name": "Not started"
        }
      }
    }
  }
  ```
</CodeGroup>

#### Example `status` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Status": {
      "id": "Z%3ClH",
      "type": "status",
      "status": {
        "id": "539f2705-6529-42d8-a215-61a7183a92c0",
        "name": "In progress",
        "color": "blue"
      }
    }
  }
  ```
</CodeGroup>

### Title

| Field   | Type                                                  | Description                                            | Example value                                |
| :------ | :---------------------------------------------------- | :----------------------------------------------------- | :------------------------------------------- |
| `title` | an array of [rich text objects](/reference/rich-text) | An array of [rich text objects](/reference/rich-text). | Refer to the example response objects below. |

#### Example `properties` body param for a POST or PATCH page request that creates or updates a `title` page property value

<CodeGroup>
  ```json JSON expandable theme={null}
  {
    "properties": {
      "Title": {
        "id": "title",
        "type": "title",
        "title": [
          {
            "type": "text",
            "text": {
              "content": "A better title for the page",
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
            "plain_text": "This is also not done",
            "href": null
          }
        ]
      }
    }
  }
  ```
</CodeGroup>

#### Example `title` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON expandable theme={null}
  {
    "Title": {
      "id": "title",
      "type": "title",
      "title": [
        {
          "type": "text",
          "text": {
            "content": "A better title for the page",
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
          "plain_text": "This is also not done",
          "href": null
        }
      ]
    }
  }
  ```
</CodeGroup>

<Info>
  The [Retrieve a page endpoint](/reference/retrieve-a-page) returns a maximum of 25 inline page or person references for a `title` property. If a `title` property includes more than 25 references, then you can use the [Retrieve a page property item endpoint](/reference/retrieve-a-page-property) for the specific `title` property to get its complete list of references.
</Info>

### URL

| Field | Type     | Description                            | Example value                      |
| :---- | :------- | :------------------------------------- | :--------------------------------- |
| `url` | `string` | A string that describes a web address. | `"https://developers.notion.com/"` |

#### Example `properties` body param for a POST or PATCH page request that creates or updates a `url` page property value

<CodeGroup>
  ```json JSON theme={null}
  {
    "properties": {
      "Website": {
        "url": "https://developers.notion.com/"
      }
    }
  }
  ```
</CodeGroup>

#### Example `url` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Website": {
      "id": "bB%3D%5B",
      "type": "url",
      "url": "https://developers.notion.com/"
    }
  }
  ```
</CodeGroup>

### Unique ID

| Field    | Type               | Description                                        | Example value |
| :------- | :----------------- | :------------------------------------------------- | :------------ |
| `number` | `number`           | The ID count (auto-incrementing).                  | 3             |
| `prefix` | `string` or `null` | An optional prefix to be applied to the unique ID. | "RL"          |

<Check>
  Unique IDs can be read using the API with a [GET page](/reference/retrieve-a-page) request, but they cannot be updated with the API, since they are auto-incrementing.
</Check>

#### Example `url` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "test-ID": {
      "id": "tqqd",
      "type": "unique_id",
      "unique_id": {
        "number": 3,
        "prefix": "RL",
      },
    },
  }
  ```
</CodeGroup>

### Verification

The verification status of a page in a wiki database. Pages can be verified or unverified, and verifications can have an optional expiration date set.

The verification status cannot currently be set or updated via the public API.

<Info>
  The `verification` property is only available for pages that are part of a [wiki database](/guides/data-apis/working-with-databases#wiki-databases). To learn more about wiki databases and verifying pages, see our [Help Center article](https://www.notion.so/help/wikis-and-verified-pages#verifying-pages).
</Info>

| Field         | Type                                     | Description                                                                                                                                                                                                                                                     | Example value                                |
| :------------ | :--------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------- |
| `state`       | `string`                                 | The verification state of the page. `"verified"` or `"unverified"`.                                                                                                                                                                                             | `"unverified"`                               |
| `verified_by` | [User](/reference/user) object or `null` | If the page if verified, a [User](/reference/user) object will be included to indicate the user who verified the page.                                                                                                                                          | Refer to the example response objects below. |
| `date`        | Object or `null`                         | If the page is verified, the date object will include the date the verification started (`start`). If an expiration date is set for the verification, an end date (`end`) will be included. ([ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date and time.) | Refer to the example response objects below. |

#### Example `verification` page property values as returned in a GET page request

**Unverified**

<CodeGroup>
  ```json JSON theme={null}
  {
    Verification: {
      id: "fpVq",
      type: "verification",
      verification: { state: "unverified", verified_by: null, date: null },
    },
  }
  ```
</CodeGroup>

**Verified with no expiration date set**

<CodeGroup>
  ```json JSON theme={null}
  {
    Verification: {
      id: "fpVq",
      type: "verification",
      verification: {
        state: "verified",
        verified_by: {
          object: "user",
          id: "01e46064-d5fb-4444-8ecc-ad47d076f804",
          name: "User Name",
          avatar_url: null,
          type: "person",
          person: {},
        },
        date: { start: "2023-08-01T04:00:00.000Z", end: null, time_zone: null },
      },
    },
  }
  ```
</CodeGroup>

**Verified with 90-day expiration date**

<CodeGroup>
  ```json JSON theme={null}
  {
    Verification: {
      id: "fpVq",
      type: "verification",
      verification: {...},
        date: {
          start: "2023-08-01T04:00:00.000Z",
          end: "2023-10-30T04:00:00.000Z",
          time_zone: null,
        },
      },
    },
  }
  ```
</CodeGroup>

### Unsupported properties

The Public API supports a subset of property types. Unsupported types will be returned with a `null` value. Exclude these unsupported types when you are updating page properties.

<CodeGroup>
  ```json JSON theme={null}
  {
  	"properties": {
  		"Place": {
        "id": "%60%40Gq",
        "type": "place",
        "place": null
      }
  	}
  }
  ```
</CodeGroup>

## Paginated page properties

The `title`, `rich_text`, `relation` and `people` page properties are returned as a paginated `list` object of individual `property_item` objects.

An abridged set of the the properties found in the `list` object is below. Refer to the [pagination documentation](/reference/intro#pagination) for additional information.

| Field           | Type               | Description                                                   | Example value                                                                                                                      |
| :-------------- | :----------------- | :------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------- |
| `object`        | `"list"`           | Always `"list"`.                                              | `"list"`                                                                                                                           |
| `type`          | `"property_item"`  | Always `"property_item"`.                                     | `"property_item"`                                                                                                                  |
| `results`       | `list`             | List of `property_item` objects.                              | `[{"object": "property_item", "id": "vYdV", "type": "relation", "relation": { "id": "535c3fb2-95e6-4b37-a696-036e5eac5cf6"}}... ]` |
| `property_item` | `object`           | A `property_item` object that describes the property.         | `{"id": "title", "next_url": null, "type": "title", "title": {}}`                                                                  |
| `next_url`      | `string` or `null` | The URL the user can request to get the next page of results. | `"http://api.notion.com/v1/pages/0e5235bf86aa4efb93aa772cce7eab71/properties/vYdV?start_cursor=LYxaUO&page_size=25"`               |
