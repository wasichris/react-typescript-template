
# 開發手冊

進行開發前請參考以下注意事項，專案使用 stylelint 與 eslint 檢查 coding style，請勿自行關閉檢查規則，所有警告或錯誤都應該要修正或提出與團隊共同討論。

請務必確實安裝啟用以下 VS Code Extensions 來確保代碼受到檢查提示：
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [StyleLint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
* [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

<br>

### 通用規範：

- 共用方法請確實提供 JSDoc 註解說明使用方式。
- 使用 Functional Component 搭配 Hook 進行開發。

<br>
<br>



# 專案結構

- public/: 靜態資源檔案，建置時會複製到輸出的資料夾中
- src/: 主要程式碼區塊
- src/assets/: 放置樣式相關資源(image/scss)
- src/components/: 通用組件
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



# 樣式設計 SCSS

使用 scss 設計站台樣式，並搭配 BEM 命名原則定義樣式類別名稱。

<br>

### 路徑檔案：
- src/assets/scss/
    - app.scss: 網站頁面樣式
    - components.scss: 通用組件樣式
- src/assets/scss/normalize/
    - _normalize.scss: 通用正規化樣式檔案(禁止修改)
    - _normalize_custom.scss: 客製化的正規化樣式檔案
- src/assets/scss/utils/
    - _function.scss: 定義 scss 方法
    - _mixins.scss: 定義 scss mixin 混和指令
    - _variables.scss: 定義 scss variable 變數

<br>

### 開發規範：

- 預設已載入 _normalize.scss 使元素樣式於各瀏覽器的顯示效果相近。
- 全站性樣式 (e.g. 站台預設文字, link 顏色 ...) 請於 _normalize_custom.scss 中統一訂定。
- 樣式 class 名稱 prefix 說明：  
    - 通用組件：根 class name 請使用 .c- 開頭，並使用 kebab case 接上通用組件名
        ``` scss
        .c-button { /* for Button component */}
        .c-form-input { /* for FormInput component */}
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
    .c-msg-box {
        max-width: 100%;

        @include respond-above {
            max-width: 500px;
        }
    }
    ```

<br>
<br>


# 通用組件 Component

重複出現的功能/樣式性區塊請建立成組件以利重用。

<br>

### 路徑檔案：
- src/components/


<br>

### 開發規範：

- 禁止相依外部資源(e.g. 讀取全域狀態 redux 或呼叫 api 等行為)，只能透過 props 與外界溝通。
- 若需相依外部資源的功能性組件(e.g. OTP)，則歸類至 container 組件範圍，請於 containers 資料夾下定義。
- 以單個 tsx 檔案建立組件，檔名為組件名稱，並使用大駝峰式命名。
- 適度以資料夾為組件進行分類 (e.g. 表單類輸入組件都放置在 form 資料夾下，並以 Form 作為 prefix)
- 組件樣式定義於 /assets/scss/components.scss 中。
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
      className={clsx('c-button', outfit && `c-button--outfit-${outfit}`, className)}
      type={type}
      {...restProps}
    >

      {children}

    </button>
  )
}

<br>

export default Button

```

<br>
<br>



# 系統常數 Constant

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


# 環境變數 Environment

會依環境切換而可能改變的常數請放置到環境變數維護。

<br>

### 路徑檔案：
- src/environment/development.ts: 開發環境的環境變數
- src/environment/test.ts: 單元測試環境的環境變數
- src/environment/production.ts: 生產環境的環境變數(區分三種模式)
    - AppModeEnum.SIT： 整合測試模式
    - AppModeEnum.UAT： 用戶測試模式
    - AppModeEnum.PROD： 正式上線模式

<br>

### 開發規範：

- 變數名稱使用小駝峰方式命名 (e.g. apiUrl )
- 需在 IEnvironment 加上 JSDoc 註解，說明變數用途

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


# 多國語系 i18n

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



# 模擬 API 資料源 

使用 Mock Service Worker 從瀏覽器端攔截正常發出的 request 請求，並依據定義回傳對應的資料來提供開發使用。 


<br>

### 路徑檔案：
- src/mocks/api/: 放置 api handler 定義檔
- src/mockHelper.ts: 放置產生假資料的輔助方法(e.g. getRandomInt)

<br>


### 開發規範：

- 請依照 api 功能類型區分不同的 api handler 檔案，例如：
    - /sample/getUserInfo 可以定義在 sampleApi.ts 中
    - /auth/login 可以定義在 authApi.ts 中
- 回傳的資料請貼近真實的數值內容才足以反應真實情況
- 可多利用 mockHelper 中的 random 方法來返回一些變動的資料，可以測試到不同情境。

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


# 頁面組件 Pages 

對應到 router 設定的每個對應頁面。 

<br>

### 路徑檔案：
- src/pages/
- src/pages/Public/
    - index.tsx: 無需登入的公開頁面樣板
- src/pages/Home/
    - index.tsx: 需要登入的私有頁面樣板

<br>

### 開發規範：

- 請依照 router 設定的 url 階層放置頁面組件資料夾
- 以資料夾為單位放置頁面組件，列如：  
  `/src/pages/Public/Login/`
  - index.tsx 頁面組件
  - components/ 頁面組件拆出的小組件  
  (檔名為組件名稱，一個組件一個 tsx 檔案，並使用大駝峰式命名)
  - hooks/ 頁面組件拆出的邏輯hook  
  (檔名為Hook名稱，一個Hook一個 tsx 檔案，並使用 use 開頭的小駝峰式命名)
- 請使用 `fc` (Functional Component) code snippet 建立組件結構，需包含 IProps 介面定義。
- Props 屬性請使用小駝峰式命名並明確給予資料類型。


<br>
<br>



# 網站路由 Router 

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



# API 服務 Services 

定義站台對外的所有 api 請求方式。 

<br>

### 路徑檔案：
- src/services/api/: 放置 api 定義檔
- src/services/models/: 放置 api request / response 物件類別
- src/services/baseApiService.ts: 設定 request / response interceptor

<br>


### 開發規範：

- 請依照 api 功能類型區分不同的 api handler 檔案，例如：
    - /sample/getUserInfo 可以定義在 sampleApi.ts 中
    - /auth/login 可以定義在 authApi.ts 中
- 建立 api 時，請依照是否要使用快取來決定使用下列哪一種方式建立
    - 需要快取：builder.query
    - 無需快取：builder.mutation
- API 命名使用大駝峰式命名
- API 名稱請依照 url 訂定，例如：/sample/get-user 則命名為 SampleGetUser

<br>



### 呼叫方式：

組件內使用 Hook
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
在 Thunk 中使用 endpoints 
``` typescript
import sampleApi from '/services/api/sampleApi'

export const initApp = (): AppThunk => async (dispatch, getState) => {
    const response = await dispatch(sampleApi.endpoints.SampleGetConfig.initiate(null)).unwrap()
}
```

<br>
<br>


# 全域狀態 Redux 

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



# 共用工具物件 Utils 

共用邏輯性 extension, helper, hook, validation 可定義於此。 

<br>

### 路徑檔案：
- src/utils/extensions/: 擴充方法(需在 index.tsx 載入)
- src/utils/helper/: 共用邏輯方法
- src/utils/hooks/: 組件共用 hook 邏輯
- src/utils/validation/: 共用資料檢核邏輯
    - schema.ts: 客製化的 yup 檢核邏輯
    - schemaChain.ts: 針對特定類型資料的 yup 檢核邏輯串
- src/utils/storage.ts: 存取前端保存資料的共用方法

<br>

### 開發規範：

- extension 命名請使用 Extension 作為 postfix
- helper 命名請使用 Helper 作為 postfix
- hook 命名請使用 use 作為 prefix
- schema 請針對"獨立"通用檢核邏輯設立  
 （e.g. 檢核字串長度是否在指定範圍內）
- schemaChain 請針對通用且有意義性資料的"複合性"檢核邏輯設立  
 （e.g. 金額[數字＋整數＋正數]）


<br>
<br>



# 通用訊息呼叫方式

<br>
<br>


# 表單操作與檢核邏輯

<br>
<br>


# 基礎站台載入流程(含檢核)

<br>
<br>
