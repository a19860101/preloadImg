# preloadImg

### 使用方法

* 引入preloadImg.js
* 根据以下方式使用：第一个参数为加载图片的数组，第二个参数对象：
	* order : 默认为无序加载 'unorder'\ 'order'
	* each  : 每张图片加载完后执行
	* all   : 所有图片加载完后执行

```javascript
 $.preload('imgs',{
	order:'order',
	each:null,
	all:null
})
```
