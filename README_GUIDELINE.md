
# 開發手冊

進行開發前請參考以下注意事項，專案使用 stylelint 與 eslint 檢查 coding style，請勿自行關閉檢查規則，所有警告或錯誤都應該要修正或提出與團隊共同討論。

請務必確實安裝啟用以下 VS Code Extensions 來確保代碼受到檢查提示：
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [StyleLint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
* [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

<br>

### 通用規範：

- 請確實提供 JSDoc 註解說明共用方法的作用與使用方式。
- 使用 Functional Component 搭配 Hook 進行開發。

<br>
<br>



# 專案結構

- public/: 靜態資源檔案，建置時會複製到輸出的資料夾中
- src/: 主要程式碼區塊
- src/assets/: 放置樣式相關資源(image/scss)
- src/components/: 通用組件
- src/containers/: 通用容器
- src/constants/: 常數
- src/environment/: 環境變數
- src/i18n/: 多國語系相關檔案
- src/mock/: mock api
- src/models/: 全站共用的物件類別
- src/pages/: 頁面組件
- src/router/: 網站路由
- src/service/: 提供 api 服務
- src/store/: 全域狀態 redux store
- src/utils/: 工具類型物件



<br>
<br>



# 樣式設計 (SCSS)

使用 scss 設計站台樣式，並搭配 BEM 命名原則定義樣式類別名稱。

<br>

### 路徑檔案：
- src/assets/scss/
    - app.scss: 網站頁面樣式
- src/assets/scss/components/: 通用組件樣式
- src/assets/scss/containers/: 通用容器樣式
- src/assets/scss/pages/: 頁面樣式
- src/assets/scss/normalize/
    - _normalize.scss: 通用正規化樣式檔案(請勿異動)
    - _normalize-custom.scss: 客製化的正規化樣式檔案
- src/assets/scss/utils/
    - _function.scss: 定義 scss 方法
    - _mixins.scss: 定義 scss mixin 混和指令
    - _variables.scss: 定義 scss variable 變數

<br>

### 開發規範：

- 預設已載入 _normalize.scss 使元素樣式於各瀏覽器的顯示效果相近。
- 全站性樣式 (e.g. 站台預設文字, link 顏色 ...) 請於 _normalize_custom.scss 中統一訂定。
- 樣式 class 名稱 prefix 說明：  
    - 通用組件：根 class name 請使用 .cp- 開頭，並使用 kebab case 接上通用組件名
        ``` scss
        .cp-button { /* for Button component */}
        .cp-form-input { /* for FormInput component */}
        ```
    - 通用容器：根 class name 請使用 .ct- 開頭，並使用 kebab case 接上通用組件名
        ``` scss
        .ct-app-layout { /* for AppLayout container */}
        ```
    - 頁面組件：根 class name 請使用 .pg- 開頭，並使用 kebab case 接上頁面組件名
        ``` scss
        .pg-login { /* for Login page */ }
        .pg-user-register { /* for UserRegister page */ }
        ```
- 設定 z-index 時，請使用 _functions.scss 中定義的 z function 賦予數值，避免 z-index 數值四散而造成優先序混亂。
    ``` scss
    .modal {
        z-index: z(modal);
    }
    ```
- 設定 media query 時，請使用 _mixins.scss 中定義的 respond-above mixin 來設定，方便套用相同 break point 設定。
    ``` scss
    .cp-msg-box {
        max-width: 100%;

        @include respond-above {
            max-width: 500px;
        }
    }
    ```

<br>
<br>



# 系統常數 (Constant)

系統中使用到的固定數值請放置到系統常數維護，避免無法看出意圖的 magic string / number 散落四處；另外，如果有前端維護的固定下拉式選單需求，也須一併維護於此處。

<br>

### 路徑檔案：
- src/constant/values.ts: 常數數值
- src/constant/enums.ts: 列舉式常數數值(包含前端維護的下拉選單)

<br>

### 開發規範：

- 常數數值名稱使用 upper snake case 方式命名 (e.g. DATE_FORMAT)
- 需加上 JSDoc 註解，說明常數用途
- 下拉選單請定義於 enums.ts 中
    - 透過 EnumDescription 註記選單顯示文字 (可放置文字或語系擋key值)
    - 透過 getEnumOptions 取得清單
        ``` html
        <select name="gender" id="gender">
            {getEnumOptions(GenderEnum).map(o => 
                <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        ```
    - 透過 getEnumDescription 取得 Description
        ``` html
            <input type="button" value="get GenderEnum.MALE description" onClick={() => {
                const description = getEnumDescription(GenderEnum, GenderEnum.MALE)
                alert(description)
            }} />
        ```

<br>


### 程式範例：

常數數值
``` typescript
/**
 * 全站 date-fns 日期格式
 */
export const DATE_FORMAT = 'yyyy-MM-dd'
```

列舉式常數數值(包含前端維護的下拉選單)
``` typescript

// ==================================
// 定義列舉，避免 magic num or string
// ==================================

/**
 *  語系
 */
export enum LangEnum {
  /**  en */
  EN = 'en',
  /**  zh-TW */
  ZH_TW = 'zh-TW',
}

// ==================================
// 定義列舉選單，用於顯示前端固定的選單內容
// ==================================

/**
 *  性別
 */
export class GenderEnum {
  /**
   * 男性
   */
  @EnumDescription('__male' /* 男性 */)
  public static readonly MALE = '1'

  /**
   * 女性
   */
  @EnumDescription('__female' /* 女性 */)
  public static readonly FEMALE = '2'
}

```

<br>
<br>





# 環境變數 (Environment)

依環境切換而可能改變的常數，請放置到環境變數維護。

<br>

### 路徑檔案：
- src/environment/development.ts: 開發環境的環境變數
- src/environment/test.ts: 單元測試環境的環境變數
- src/environment/production.ts: 生產環境的環境變數(區分三種模式)
    - `AppModeEnum.SIT`： 整合測試模式
    - `AppModeEnum.UAT`： 用戶測試模式
    - `AppModeEnum.PROD`： 正式上線模式

<br>

### 開發規範：

- 變數需定義於 IEnvironment 中並加上 JSDoc 註解，說明變數用途
- 先於 development.ts 定義數值，後續再依據需調整的環境進行覆寫
- test.ts 與 production.ts 數值都基於 development.ts，因此若數值相同則無需設定
- 變數名稱使用小駝峰方式命名 (e.g. apiUrl )

<br>

### 程式範例：
``` typescript

interface IEnvironment {
  /** 運行環境 (development / production) */
  appEnv: AppEnvEnum,

  /** 運行模式 (SIT / UAT / PROD) */
  appMode: AppModeEnum,

  /** 使用的 API 中台位置 */
  apiUrl: string,

  /** API 等待逾期時間 ms */
  apiTimeout: number
}

const developmentEnvironment: IEnvironment = {
  appEnv: process.env.NODE_ENV as AppEnvEnum,
  appMode: process.env.REACT_APP_MODE as AppModeEnum,
  apiUrl: '/mock-api',
  apiTimeout: 180000
}
```


<br>
<br>




# 本地端儲存空間 (Storage)

封裝所有本地端資訊存取方式(e.g. session / local storage, cookie...)，避免後續因存取位置調整而牽動過多程式。

<br>

### 路徑檔案：
- src/utils/storage.ts

<br>

### 開發規範：

- 變數名稱使用小駝峰方式命名 (e.g. isRememberMe )
- 於上方統一定義存放數值的 Key 值，使用 upper snake case 方式命名 (e.g. IS_REMEMBER_ME)
- 需加上 JSDoc 註解，說明變數用途

<br>

### 程式範例：
封裝本地端資訊存取行為 
``` typescript
/* src/utils/storage.ts */
const KEY = {
  LANG: '@i18nextLng'
}

export default {

  /**
   * 網站語系
   */
  get lang() {
    return window.localStorage.getItem(KEY.LANG) || ''
  },
  set lang(value) {
    if (value) window.localStorage.setItem(KEY.LANG, value)
    else window.localStorage.removeItem(KEY.LANG)
  }

}
```
操作本地端資訊方式
``` typescript
import storage from '/utils/storage'

// 取值
const defaultLng = storage.lang

// 設值
storage.lang = lang

// 移除
storage.lang = ''

```



<br>
<br>





# 通用組件 (Component)

重複出現的功能/樣式性區塊請建立成組件以利重用。
> 禁止直接相依外部資源(e.g. 讀取全域狀態 redux 或呼叫 api 等行為)，若需直接相依外部資源的功能性組件則歸類至 Container 中定義。

<br>

### 路徑檔案：
- src/components/


<br>

### 開發規範：

- 禁止直接相依外部資源(e.g. 讀取全域狀態 redux 或呼叫 api 等行為)，只能透過 props 與外界溝通。
- 若需直接相依外部資源的功能性組件(e.g. OTP)，則歸類至 container 組件範圍，請於 containers 資料夾下定義。
- 以 tsx 檔案建立組件，檔名為組件名稱，並使用大駝峰式命名。
- 適度以資料夾為組件進行分類 (e.g. 表單類輸入組件都放置在 form 資料夾下，並以 Form 作為 prefix)
- 組件樣式定義於 /assets/scss/components/ 中。
- 可使用 `fcf` (Functional Component by Filename) code snippet 建立組件結構，包含 IProps 介面定義。
- 定義 Props 屬性使用小駝峰式命名並給予明確資料類型。

<br>


### 相關 Props Type 參考：

- PropsWithChildren\<IProps>
- IProps & ButtonHTMLAttributes\<HTMLButtonElement>

> 但如果只想開放特定屬性，就不用合併 HTMLAttributes 類型 (e.g 例如只用到 className 就直接在 IProps 宣告即可)；會使用到 HTMLAttributes 表示將把所有 props 都會傳入原生的 HTML element 中時才有意義 (例如 `<button {...props} > submit </button>` ) 

<br>


### 程式範例：
``` typescript
/* /components/Button.tsx */

import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

interface IProps {
  outfit?: 'primary' | 'link' | undefined;
}

const Button = (props: IProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { className, outfit, type = 'button', children, ...restProps } = props
  return (
    <button
      className={clsx('cp-button', outfit && `cp-button--outfit-${outfit}`, className)}
      type={type}
      {...restProps}
    >

      {children}

    </button>
  )
}

export default Button

```

<br>
<br>


# 容器組件 (Container) 

重複出現的功能/樣式性區塊，且直接相依外部資源(e.g. 讀取全域狀態 redux 或呼叫 api 等行為)，請建立成容器組件以利重用。


<br>

### 路徑檔案：
- src/containers/

<br>

### 開發規範：

- 以資料夾為單位放置容器組件，使用大駝峰式命名，列如：  
  `/src/container/OtpModal/`
  - index.tsx 容器組件定義於此
  - components/ 容器組件拆出的私有小組件  
  (檔名為組件名稱，一個組件一個 tsx 檔案，並使用大駝峰式命名)
  - hooks/ 容器組件拆出的私有邏輯 hook  
  (檔名為Hook名稱，一個Hook一個 tsx 檔案，並使用 use 開頭的小駝峰式命名)
- 組件樣式定義於 /assets/scss/containers/ 中。
- 請使用 `fc` (Functional Component) code snippet 建立組件結構，需包含 IProps 介面定義。
- Props 屬性請使用小駝峰式命名並明確給予資料類型。


<br>
<br>



# 頁面組件 (Pages) 

對應到 router 設定的每個對應頁面。 

<br>

### 路徑檔案：
- src/pages/
- src/pages/Public/
    - index.tsx: 無需登入的公開頁面樣板
- src/pages/Home/
    - index.tsx: 需要登入的私有頁面樣板(登入狀態檢核)

<br>

### 開發規範：

- 請依照 router 設定的 url 階層放置頁面組件資料夾
- 以資料夾為單位放置頁面組件，使用大駝峰式命名，列如：  
  `/src/pages/Public/Login/`
  - index.tsx 頁面組件定義於此
  - components/ 頁面組件拆出的私有小組件  
  (檔名為組件名稱，一個組件一個 tsx 檔案，並使用大駝峰式命名)
  - hooks/ 頁面組件拆出的私有邏輯 hook  
  (檔名為Hook名稱，一個Hook一個 tsx 檔案，並使用 use 開頭的小駝峰式命名)
- 組件樣式定義於 /assets/scss/pages/ 中。
- 請使用 `fc` (Functional Component) code snippet 建立組件結構，需包含 IProps 介面定義。
- Props 屬性請使用小駝峰式命名並明確給予資料類型。


<br>
<br>



# 網站路由 (Router) 

定義 URL 所訪問到的頁面組件位置。 

<br>

### 路徑檔案：
- src/router/index.tsx

<br>

### 開發規範：

- 使用 lazy 動態載入頁面組件目的在於避免首次訪問站台就一次性的載入所有檔案。
- 依照頁面功能設定不同 webpack chunk name，各自存在不同的 js bundle file，僅會在訪問到相對應的頁面時才會載入。
- 預設路由規劃如下：
    - /public/ 路徑下為無需登入使用的頁面
    - /home/ 路徑下為需要登入使用的頁面
    - /dev/ 路徑下為開發時建立的輔助開發頁面(production環境下不載入)
<br>


### 轉址方式：

組件內使用 useNavigate Hook
``` typescript
import { useNavigate, useParams } from 'react-router-dom'

const Component = (props: IProps) => {
    const navigate = useNavigate()
    const { userId } = useParams() // get params from url

    return <button onclick={()=>navigate('/dev/sample/user01')}>go</button>
}
```
組件外使用自定義的 appNavigate 方法進行轉址
``` typescript
import { appNavigate } from '/router'

const goSomewhere = () => {
    appNavigate('/home/main')
}
```
> 不要使用 router.navigate('/xx/oo') 轉址，因為在有 basename 的情境會有問題，因為路徑不會自動加上 basename 在前面（但組件內使用的 useNavigate 不會有這個問題） 

<br>

### 程式範例：
``` typescript
const PublicLayout = lazy(() => import(/* webpackChunkName: "public" */ '../pages/Public'))
const Landing = lazy(() => import(/* webpackChunkName: "public" */ '../pages/Public/Landing'))
const Login = lazy(() => import(/* webpackChunkName: "public" */ '../pages/Public/Login'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="public" replace /> },

      /* [公開頁面區] */
      {
        path: 'public',
        element: Suspense(<PublicLayout />),
        children: [
          { index: true, element: <Navigate to="landing" replace /> },
          { path: 'landing', element: Suspense(<Landing />) },
          { path: 'login', element: Suspense(<Login />) }
        ]
      },

      /* [預設頁面] */
      { path: '*', element: <Navigate to="public" replace /> }

    ]
  }
], {
  basename: process.env.PUBLIC_URL
})
```

<br>
<br>


# 多國語系 (i18n)

預設支援中英兩種語系，會先取得瀏覽器語系，若非站台所支援的語系時會 fallback 到預設繁體中文語系。

> 盡量避免到處都可以切換語系，因為有些文字在切換時不會即時響應(e.g. 表單錯誤訊息)，除非重新觸發渲染或重載頁面時才會套用新語系，所以盡量在入口處(頁面組成單純)中提供語系切換功能，以免在功能複雜處進行切換時造成部分文字無法即時響應變動的狀況。

<br>

### 路徑檔案：
- src/i18n/locales/en.ts: 英文語系檔
- src/i18n/locales/zh-TW.ts: 中文語系檔

<br>


### 開發規範：

- 語系變數名稱使用 __ 作為 prefix 並搭配小駝峰方式命名 (e.g. __password )
- 變數名稱貼近語系即可，不需要依據頁面分類（因為實務上很難區分共不共用的語系文字）
- 可適度加上 name space 來區分語系類型（e.g. __validation_xxx for 檢核相關） 

<br>


### 取得語系文字方式：

組件內使用 useTranslation Hook
``` typescript
import { useTranslation } from 'react-i18next'

const Component = (props: IProps) => {
    const { t } = useTranslation()
    return <div>{t('__account' /* 帳號 */)}</div>
}
```
組件外使用 i18n 實體
``` typescript
import i18n from '/i18n'

const getSomething = () => {
    return i18n.t('__account' /* 帳號 */)
}
```

<br>


### 語系檔案範例：
``` typescript
/* src/i18n/locales/zh-TW.ts */

export default {

  /* ================================= */
  /* ====  欄位檢核提示文字  ============ */
  /* ================================= */

  __validation_invalid: `欄位檢核錯誤`,
  __validation_required: `請輸入資訊`,
  __validation_required_with_name: `請輸入{{name}}`,

  /* ================================= */
  /* ====  其他不分類文字   ============ */
  /* ================================= */

  __account: `帳號`,
  __male: `男性`,
  __female: `女性`,
}
```

<br>
<br>





# API 服務 (Services) 

定義站台對外的所有 api 請求方式。 

<br>

### 路徑檔案：
- src/services/api/: 放置 api 定義檔
- src/services/models/: 放置 api request / response 物件類別
    - common.ts: 通用的 api request / response 物件結構
- src/services/baseApiService.ts: 設定 request / response interceptor

<br>


### 開發規範：

- 請依照 API 功能類型區分不同的 API 定義檔，例如：
    - /sample/getUserInfo api 可以定義在 /api/sampleApi.ts 中
    - /auth/login api 可以定義在 /api/authApi.ts 中
- 建立 API Endpoints
    - 建立 API 時，請依照是否要使用快取來決定使用下列哪一種方式建立
        - 需要快取：builder.query
        - 無需快取：builder.mutation
    - API 命名使用大駝峰式命名
    - API 名稱請參考 url 訂定，讓其具有唯一性，例如：/sample/get-user 則命名為 SampleGetUser
- Request / Response 物件介面定義
    - 依照 api 定義檔檔名於 /services/models/ 建立對應的檔案
    - api request body 物件介面命名規則為 I+API名稱+Req (e.g. ISampleGetUserReq)
    - api request response 物件介面命名規則為 I+API名稱+Res (e.g. ISampleGetUserRes)
- HTTP Request/Response Interceptor  
    - 可以對 Request 資料進行一致性的處理（e.g. Request header 加入 token）  
    - 可以對 Response 結果進行一致性的處理（e.g. 判斷結果碼來執行特定行為，如登出系統）

<br>

### 程式範例：
建立 API Endpoint 
``` typescript
import { base64Encode } from '../../utils/helpers/encodeHelper'
import { baseApiService } from '../baseApiService'
import baseReqCreator from '../baseReqCreator'
import { IBaseRes } from '../models/common'
import { ISampleGetProductsReq, ISampleGetProductsRes, ISampleGetImgReq, ISampleGetUserReq } from '../models/sample'

const sampleApi = baseApiService.injectEndpoints({
  endpoints: (builder) => ({

    // 範例：發出 POST API 並取得 Image (快取:builder.query)
    SampleGetImg: builder.query<string, ISampleGetImgReq>({
      query: (req) => ({
        url: '/sample/get-img',
        method: 'POST',
        body: baseReqCreator(req),
        // 有需要特別處理才需要 handle 
        responseHandler: async (response: Response) => {
          const arrayBuffer = await response.arrayBuffer()
          return 'data:image/png;base64,' + base64Encode(arrayBuffer)
        }
      })
    }),

    // 範例：發出 GET API 並取得 JSON (無快取:builder.mutation)
    SampleGetProducts: builder.mutation<IBaseRes<ISampleGetProductsRes>, ISampleGetProductsReq>({
      query: (req) => ({
        url: `/sample/get-products?category=${req.category}`,
        method: 'GET'
      })
    }),

  }),
  overrideExisting: true
})

export default sampleApi


```


組件內使用 Hook 呼叫 API
``` typescript
import sampleApi from '/services/api/sampleApi'

// mutation - 可自訂觸發時機
const Component = (props: IProps) => {
    const [apiSampleGetProducts] = sampleApi.useSampleGetProductsMutation()
    const callApi = async()=>{
        const response = await apiSampleGetProducts({ category: 'pc' }).unwrap()
    }

    return <button onclick={callApi}>call api</button>
}

// query - 可自訂觸發時機
const Component = (props: IProps) => {
    const [apiSampleGetImg] = sampleApi.useLazySampleGetImgQuery() 
    const callApi = async()=>{
        const response = await apiSampleGetImg({ height: 200, width: 800 }, true /* cached */).unwrap()
    }

    return <button onclick={callApi}>call api</button>
}

// query - 載入直接觸發
const Component = (props: IProps) => {
    const { data: base64Img/*, isLoading, isError, refetch */ } =
        sampleApi.useSampleGetImgQuery({ height: props.height, width: props.width }, {
            // pollingInterval: 60_000 // pull data every 1 minute
        })

    return <img alt="" src={base64Img} />
}
```
在組件外直接使用 dispatch endpoint 呼叫 API
``` typescript
import sampleApi from '/services/api/sampleApi'

export const initApp = (): AppThunk => async (dispatch, getState) => {
    const response = await dispatch(sampleApi.endpoints.SampleGetConfig.initiate(null)).unwrap()
}
```

<br>
<br>



# 模擬 API 資料源 (Mock)

透過 Mock Service Worker 套件，讓我們可以在網路層 (Network) 發出實際的請求 (Request)，並透過 Service Worker 攔截，回傳預先定義好的資料內容。


<br>

### 路徑檔案：
- src/mocks/api/: 放置 api handler 定義檔
- src/mockHelper.ts: 放置產生假資料的輔助方法(e.g. getRandomInt)

<br>


### 開發規範：

- 請依照 api 功能類型區分不同的 api handler 檔案，例如：
    - /sample/getUserInfo 可以定義在 sampleApi.ts 中
    - /auth/login 可以定義在 authApi.ts 中
- 回傳資料請貼近真實內容才足以反應真實情況
- 利用 mockHelper 中的 random 方法來返回一些變動的資料，以測試到不同情境。

<br>


### 程式範例：
``` typescript
/* src/mocks/api/sampleApi.ts */
const sampleApi = [
    rest.get(getApiUrl('/sample/get-products'), (req, res, ctx) => {
        const urHeader = req.headers.get('ur-header') ?? ''
        const category = req.url.searchParams.get('category')
        const response = createRes<ISampleGetProductsRes>({
        products: getRandomArray(3, () => ({
            category,
            id: getGuid(),
            stock: getRandomIntRange(10, 100),
            price: getRandomInt(5),
            gender: getRandomArrayItem([GenderEnum.MALE, GenderEnum.FEMALE])
        }))
        })

        return res(
        ctx.set('my-header', urHeader),
        ctx.status(200),
        ctx.delay(),
        ctx.json(response)
        )
    }),
]
```

<br>
<br>




# 全域狀態 (Redux) 

定義全域狀態，讓各組件都可以同步接收到狀態的改變。 

<br>

### 路徑檔案：
- src/store/index.ts: 全域狀態儲存庫
- src/store/middleware/
    - apiErrorHandleMiddleware.ts: 處理 api 相關錯誤
    - apiLoadingMiddleware.ts: 處理 api loading 狀態
    - authListenerMiddleware.ts: 處理登入權限的狀態機
- src/store/slices/
    - appSlice.ts: app 層級的狀態
    - msgSlice.ts: 通用訊息顯示狀態

<br>


### 開發規範：

- 僅限於跨組件且共通性的資料存放
- 請依照功能類型區分不同的 slice 檔案
- 定義狀態 selection 時，請使用 select 作為 prefix  
  (e.g. const selectLoadingApiCounter = (state: RootState) => state.app.loadingApiList.length)
- 定義動作 action 時，請以 event 角度思考，避免用 setter 方式定義 action
- 操作狀態請使用自定義的 useAppDispatch 及 useAppSelector 獲得具體型別
    - import useAppDispatch from '/utils/hooks/useAppDispatch'
    - import useAppSelector from '/utils/hooks/useAppSelector'

<br>



### 全域狀態持久化：
如果全域狀態中有部分資訊需要在頁面重整時被保留下來(e.g. 登入狀態, token)，此時就可以透過 persistReducer 設定要保留的參數及保留的地方(預設在localStorage)。
``` typescript
/* src/store/index.ts */
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

// Persist state for app reducer
const appPersistConfig = {
  key: appSlice.name,
  storage,
  whitelist: ['isLogin', 'authToken']
}

// Reducer
const rootReducer = combineReducers({
  app: persistReducer(appPersistConfig, appSlice.reducer),
})
```

<br>

### 全域狀態操作方式：

組件內使用 useAppSelector Hook 取得狀態
``` typescript
import useAppSelector from '/utils/hooks/useAppSelector'

const Component = (props: IProps) => {
    const counterValue = useAppSelector(state => state.counter.value)
    return <div>{counterValue}</div>
}
```

組件外使用 store 實體取得狀態
``` typescript
import { store } from '/store'

const isLogin = store.getState().app.isLogin
```
> 注意，狀態被改變時並不會響應變動此變數

<br>

組件內使用 useAppDispatch Hook 觸發動作
``` typescript
import useAppDispatch from '/utils/hooks/useAppDispatch'
import { increment } from '/store/slices/counterSlice'

const Component = (props: IProps) => {
    const dispatch = useAppDispatch()
    return <button onclick={()=>dispatch(increment())}>do</button>
}
```

組件外使用 store 實體觸發動作
``` typescript
import { store } from '/store'
import { addGlobalMsg, GlobalMsg } from '/store/slices/msgSlice'

const showMsgBox = (globalMsg: GlobalMsg) => store.dispatch(addGlobalMsg(globalMsg))
```

<br>
<br>




# 表單操作與檢核邏輯 (Formik & Yup)

統一使用 Formik 搭配 yup 進行表單操作與檢核

> 檢核錯誤文字盡量在需求訪談期間就規範好一致性(避免相同類型的錯誤要顯示不同文字)，並且不要包含 `欄位名稱` 在訊息中 (e.g. "請輸入用戶姓名" 可以使用 "請輸入資訊" 呈現就好)，這樣可以大幅降低開發複雜度

<br>

### 路徑檔案：
- src/utils/validation/: 
    - schema.ts: 客製化的 yup 檢核邏輯
    - schemaChain.ts: 針對特定類型資料的 yup 檢核邏輯串

<br>

### 開發規範：


- 先查看 yup 是否提供所需的檢核邏輯 (e.g. min, max, moreThan ...)
- 不符需求可以自行建立檢核 schema 邏輯： 

  `schema`:
    - 客製化的檢核邏輯定義於 schema.ts 中，變數命名使用 Schema 結尾 (e.g. maxDigitNumberSchema)
    - 請針對"獨立"通用檢核邏輯設立（e.g. 檢核字串長度是否在指定範圍內）

  `schemaChain`:
    - 組合性的檢核邏輯定義於 schemaChain.ts 中，變數命名使用小駝峰，名稱請貼近檢核對象類型(e.g. twMoneyAmt)
    - 請針對通用且有意義性資料的"複合性"檢核邏輯設立（e.g. 台幣金額[數字＋整數＋正數]）  
    <br>
- 建立組件內私有 form hook 來收納表單檢核邏輯，避免過多資訊造成頁面組件的複雜性提高  
    - hook 檔案建立於 sub 資料夾 hooks 中 (e.g. src/pages/dev/Sample/hooks/)
    - 使用 use 開頭 + 表單名稱 + Form 結尾命名 hook (e.g. useSampleForm.ts)
    - 使用 `uf` (use form) code snippet 來建立表單 hook 代碼結構
    - 使用 hook 收納表單資料介面、表單初始資料、檢核邏輯、表單送出行為。  


 <br>

### 程式範例：

客製化的檢核邏輯
``` typescript
/**
* 檢核數字的位數是否在範圍內
 * @param max 金額位數上限
 * @returns schema
*/
export const maxDigitNumberSchema = (max = 1) =>
  yup.number().test({
    name: 'maxDigitNumberSchema',
    exclusive: true,
    params: { max },
    message: t('__validation_maxDigitNumber', { max })!,
    test: (value) => {
      if (!value) return true
      return value < Math.pow(10, max)
    }
  })

```

組合性的檢核邏輯
``` typescript
/**
 * 台幣金額檢核邏輯[需大於0且上限10位數] (e.g. 月收入、貸款金額)
 * @param isRequired 是否必填
 * @param name 欄位名稱
 * @returns
 */
twMoneyAmt: (isRequired: boolean, name?: string) => {
  return yup
    .number()
    .concat(
      isRequired
        ? name
          ? yup.number().required(getRequiredMsg(name))
          : yup.number().required()
        : yup.number())
    .integer()
    .moreThan(0)
    .concat(maxDigitNumberSchema(10))
}
```

組件內建立私有 form hook 來收納表單檢核邏輯
``` typescript
import { FormikHelpers } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { getRequiredMsg } from '/utils/helpers/commonHelper'
import { strLengthRangeSchema } from '/utils/validations/schema'
import schemaChain from '/utils/validations/schemaChain'

// 定義表單資料
interface IFormValues {
  account: string,
  password: string,
  salary: number
}

const useSampleForm = (initValues: IFormValues) => {
  const { t } = useTranslation()
  const [initFormValues, setInitFormValues] = useState(initValues)

  // 檢核邏輯
  const validationSchema = () =>
    yup.object({
      account:
        // 如果必填錯誤訊息需要欄位名稱，就這樣覆寫訊息，只需傳入欄位名稱
        yup.string().required(getRequiredMsg(t('__account' /* 帳號 */)))
          .max(5), // 內建邏輯
      password:
        // 如果必填錯誤訊息不需要欄位名稱，就回應預設通用訊息"請輸入資訊"
        yup.string().required()
          .concat(strLengthRangeSchema(2, 10)), // 自定邏輯
      salary:
        schemaChain
          .twMoneyAmt(true, t('__salary' /* 月薪 */)!) // 自定邏輯串(針對通用且有意義性的資料類型)
    })

  // 送出表單
  const onFormSubmit = (values: IFormValues, actions: FormikHelpers<IFormValues>) => {
    alert(JSON.stringify(values, null, 2))
    actions.setSubmitting(false)
  }

  // 回傳表單資訊給使用組件
  return { initFormValues, setInitFormValues, validationSchema, onFormSubmit }
}

export default useSampleForm
```

表單主體
``` typescript

const Sample = (props: IProps) => {

  // 使用自定義 form hook 給定表單初始值
  // 並從 form hook 取出表單檢核所需資訊
  const form = useSampleForm({ account: '', password: '', salary: 0 })

  return <>
   <section>
      <h2>表單檢核</h2>
      <Formik
        enableReinitialize
        initialValues={form.initFormValues}
        validationSchema={form.validationSchema()}
        onSubmit={form.onFormSubmit}
      >
        {({ dirty, isValid, resetForm, values }) => (
          <Form >

            <div>
              <label htmlFor='account' > {t('__account' /* 帳號 */)}</label>
              <FormTextInput id="account" name="account" type="text" />
            </div>

            <div>
              <label htmlFor='password' > {t('__pwd' /* 密碼 */)} </label>
              <FormTextInput id="password" name="password" type="password" />
            </div>

            <div>
              <label htmlFor='salary' > {t('__salary' /* 月薪 */)} </label>
              <FormTextInput id="salary" name="salary" type="text" caption={t('__useTwd' /* 使用臺幣為單位 */)} />
            </div>

            <input
              type="button"
              onClick={() => resetForm({ values: form.initFormValues })}
              value={t('__clear' /* 清除 */)!} />

            <input
              type="submit"
              disabled={!(dirty && isValid)}
              value={t('__submit' /* 送出 */)!} />

            <br />

            <input
              type="button"
              onClick={() => form.setInitFormValues({ ...form.initFormValues, salary: values.salary + 1 })}
              value={'搭配 enableReinitialize 重新給予初始值來 re-init 表單（可能是從遠端來的資料）'} />

          </Form>
        )}
      </Formik>
    </section>
  </>

}

```


<br>
<br>



# API 全域錯誤處理

- `src/services/baseApiService.ts`  
  HTTP Request/Response Interceptor :  
  可以對 Request 資料進行一致性的處理（e.g. Request header 加入 token）  
  可以對 Response 結果進行一致性的處理（e.g. 判斷結果碼來執行特定行為，如登出系統）
  
- `src/store/middleware/apiErrorHandleMiddleware.ts`  
  接收到非 HTTP 200 狀態的異常回應處理 (e.g. 彈窗提示)


<br>
<br>


# 共用工具物件 (Utils) 

共用邏輯性 extension, helper, hook, validation 可定義於此。 

<br>

### 路徑檔案：
- src/utils/extensions/: 擴充方法(需在 index.tsx 載入)
- src/utils/helper/: 共用邏輯方法
- src/utils/hooks/: 組件共用 hook 邏輯
- src/utils/validation/: 表單檢核邏輯

<br>

### 開發規範：

- extension 命名請使用 Extension 作為 postfix
- helper 命名請使用 Helper 作為 postfix
  (依據使用性質區分不同 helper，若無特殊性可放置在 commonHelper)
- hook 命名請使用 use 作為 prefix  
  (放置 component / container 中的共用邏輯)

<br>
<br>




# 應用 - 開發技巧

提供一些常見的開發技巧。

<br>


- 使用 clsx 簡化條件式 class name 的操作
    ``` typescript
    import clsx from 'clsx'
    const isActive = true
    const otherClassName = 'red highlight'
    const className = clsx('cp-button', isActive && 'active', otherClassName)
    /* className = 'cp-button active red highlight' */
    ```


<br>
<br>



# 應用 - 通用訊息呼叫方式

預設透過 msgSlice 提供全域訊息顯示的叫用機制，用以呈現文字資訊給用戶。

<br>

### 程式範例：
``` typescript
import { showMsgBox } from '/utils/helpers/commonHelper'

showMsgBox({
    content: '這是第一個訊息。',
    title: '訊息佇列',
    mainBtn: { label: '我知道了', onClick: () => console.log('我知道了') },
    minorBtn: { label: '關閉', onClick: () => console.log('關閉') },
    hasCloseBtn: true
})
```

<br>
<br>






# 應用 - 監聽 Redux Action

有時候我們只想要知道某個 Action 被 dispatch 了，然後需要在特定組件上執行某些行為，而無關乎 Action 透過 Reducer 變動了什麼數值；此時我們就可以透過監聽的方式來監看 Action 。

- 全域監聽：可以透過 createListenerMiddleware 加入 store middleware 來處理   
(e.g. /src/store/middleware/authListenerMiddleware.ts 監看 startApp Action)

- 組件監聽：可以透過 addListener 在組件內監聽事件
  ``` typescript
  import { increment } from './store/slices/counterSlice'
  import { addListener } from '@reduxjs/toolkit'

  const app = () => {
    useEffect(() => {
      // Could also just `return dispatch(addListener())` directly, but showing this
      // as a separate variable to be clear on what's happening
      const unsubscribe = dispatch(
        addListener({
          actionCreator: increment,
          effect: (action, listenerApi) => {
            // do some useful logic here
          }
        })
      )
      return unsubscribe
    }, [])

    return <div> ... </div>
  }
  ```


<br>
<br>


# 應用 - 站台載入流程

本樣板已建立基礎站台載入流程，方便處理以下兩個通用性的任務：
- 執行載入網站前必需要完成的任務 (e.g. 呼叫 API 取得網站參數)
- 檢核用戶登入狀態及處理接續行為

<br>

網站載入 app.tsx 時會先執行 initApp Thunk Action，且只有在順利完成這邊定義的行為(回傳 true)後，才會載入 router 依據 URL 進入對應頁面，因此針對載入網站前需要完成的任務可定義於此。
``` typescript
/* src/store/slices/appSlice.ts */

export const initApp =
  (): AppThunk<Promise<boolean>> =>
    async (dispatch, getState) => {
      let isInitAppSuccess = true
      
      // do some init app job here
      // ...

      if (isInitAppSuccess) {
        // 順利完成後發送 startApp 訊號  
        dispatch(startApp())
      }

      return isInitAppSuccess
    }
```

<br>


上述在順利完成載入網站前所需要執行的動作後，隨即會發出 startApp action 訊號觸發監聽此 action 的 authListenerMiddleware 中介層，而這邊就是一個登入狀態的狀態機(State Machine)，依據狀態來等待特定 action 訊號進行下個動作，舉例如下：

- 目前尚未登入：
    - 等待登入成功訊號(loginSuccess action)
    - 若接收到登入成功訊號，則進行登入後行為(e.g. 設定用戶資訊與token、導頁到登入後首頁)
    - 並且進入已登入狀態來等待登出訊號(logout action)  
<br>

- 目前已經登入：
    - 等待登出訊號(logout action)
    - 若接收到登出訊號，則進行登出行為(e.g. 清除用戶資訊與token、導頁到登入頁)
    - 並且進入未登入狀態來等待登入成功訊號(loginSuccess action)

<br>


``` typescript
/* /src/store/middleware/authListenerMiddleware.ts  */

import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import { RootState } from '..'
import { startApp, loginSuccess, logout, updateLoginInfo } from '../slices/appSlice'
import { appNavigate } from '../../router'
import { getQueryStrValue } from '../../utils/helpers/urlHelper'

const authListenerMiddleware = createListenerMiddleware()

authListenerMiddleware.startListening({
  actionCreator: startApp,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners()

    // State Machines for auth
    const { take, dispatch, getState /* getOriginalState */ } = listenerApi
    try {
      while (true) {
        // 檢查目前是否為已登入狀態
        const getRootState = getState as () => RootState
        const isLogin = getRootState().app.isLogin
        if (isLogin === false) {
          // #############
          // ### 未登入 ###
          // #############

          // [阻塞] 等待登入成功訊號
          const [{ payload: { authToken } }] = await take(loginSuccess.match)

          // 處理登入事宜
          dispatch(updateLoginInfo({ authToken, isLogin: true }))

          // 回到原本欲訪問的頁面
          const redirectUrl = getQueryStrValue('redirect_url')
          redirectUrl ? appNavigate(redirectUrl) : appNavigate('/home/main')
        } else {
          // #############
          // ### 已登入 ###
          // #############

          // [阻塞] 等待登出要求訊號
          await take(isAnyOf(logout))

          // 處理登出事宜
          dispatch(updateLoginInfo({ authToken: '', isLogin: false }))
          appNavigate('/public/login')
        }
      }
    } catch (error) {
      console.error('authListenerMiddleware error:', error)
    }
  }
})

export default authListenerMiddleware.middleware
```

<br>

因此登入行為由各組件執行，只需要在登入成功後送出登入成功訊號(loginSuccess action)，並且夾帶所需 authToken 資訊即可，後續行為都統一交給 authListenerMiddleware 控制；反之如果是要登出，也只要送出登出訊號(logout action)即可。

``` typescript

const onLoginFormSubmit = async (values: IFormValues, actions: FormikHelpers<IFormValues>) => {
    const request = { pcode: values.pcode, userId: values.userId }
    const response = await apiSampleLogin(request).unwrap()
    const { header: { returnCode, returnMsg }, body } = response
    if (returnCode.isSuccessCode()) {

        // 登入成功，發送登入成功訊號(loginSuccess action)
        dispatch(loginSuccess({ authToken: body.authCode }))

    } else {
        showMsgBox({ title: '登入', content: `登入失敗(${returnCode}:${returnMsg})` })
    }
    actions.setSubmitting(false)
}

// 登出
const onLogout = () =>  dispatch(logout())

```


<br>
<br>



# 應用 - 識別版本

當網站開發串上 CI / CD 後，全自動拉取最新版本程式進行建置部屬，所以有時候會對線上網站產生版本上的懷疑，因此我們把 git 的 commit id 補上作為識別，提供線上網站版本識別依據。

- 使用 git-revision-webpack-plugin 取得本地端版控資訊 
- 透過 Webpack DefinePlugin 設定到 process.env.APP_VERSION 中  
  ``` typescript
  const getAppVersionInfo = () => {
    try {
      // use git commit hash as version info
      return `${gitRevisionPlugin.version()}@${gitRevisionPlugin.lastcommitdatetime()}@${Date.now()}`
    } catch (error) {
      return '[NO GIT INFO AS REFERENCE]'
    }
  }
  
  module.exports = {
    webpack: {
      configure: (webpackConfig: Configuration, { env, paths }: any) => {
        // 加入 process.env 額外的環境變數
        addDefinePluginEnvValue({
          APP_VERSION: JSON.stringify(getAppVersionInfo())
        }, webpackConfig)
  
        return webpackConfig
      }
    }
  }
  ```

- 可以在 index.html 上查看版本資訊
  ``` typescript
  <!-- application version info -->
  <div style="display: none;">
        version: <%= process.env.APP_VERSION %>
        <!--  version: a9ac24b@2023-01-12T18:11:44+08:00@1673573742077 -->
  </div>
  ```


<br>
<br>