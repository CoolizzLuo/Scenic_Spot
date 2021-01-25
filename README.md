# Scenic_Spot
關於題目回答

## General exercise

### 1. Explain the difference between cookies, session storage, and local storage?
都保存於本機端 
cookies: 可以攜帶於http中, 可設定失效時間, 儲存空間較小
session storage: 生命週期在分頁或瀏覽器被關閉後清除
local storage: 需要手動作清除

### 2. What does CORS stand for and what issue does it address?
跨來源請求, 限制非同 domain, port 的 http請求

### 3. What is HTTP method OPTIONS?
Http 發送request請求方式, 通常會利用在同個請求網址下給予不同的method達成目的

### 4. Describe BFC (Block Formatting Context) and how it works.
會換行, 佔滿容器寬度(依據父層), 可以設定高度寬度 

### 5. Explain the difference between layout, painting and compositing.
 這題不太清楚, 查詢了 google
Painting - 利用像素, 顏色繪製出來
Compositing - 利用拼湊, 把 layer 合併起來

### 6. Can you explain the difference between px, em and rem as they relate to font sizing?
px - 絕對單位
em - 相對單位, 因父層元素影響, ex: 父層16px, 子層 2em = 16px*2
rem - 相對單位, 比例只依照 HTML 標籤影響

### 7. What tools would you use to find a performance bug in your code?
沒有很熟運用到, 自己平常檢查是利用 Chrome DevTool 檢查 performance


## Programming exercise
https://coolizzluo.github.io/Scenic_Spot/
