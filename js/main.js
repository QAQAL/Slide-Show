var showImageAtIndex = function(slide, index) {
    var nextIndex = index
    // 设置父节点的 data-active
    slide.dataset.active = nextIndex
    // 切换图片
    var className = 'active'
    removeClassAll(className)
    var nextSelector = '#id-image-' + String(nextIndex)
    var img = e(nextSelector)
    img.classList.add(className)

    // 切换小圆点
    var indiClassName = 'white'
    removeClassAll(indiClassName)
    var indiSelector = '#id-indi-' + String(nextIndex)
    var indicator = e(indiSelector)
    indicator.classList.add(indiClassName)
}

var nextIndex = function(slide, offset) {
    var numberOfImgs = Number(slide.dataset.imgs)
    var activeIndex = Number(slide.dataset.active)
    // log('click slide')
    // 求出下一张图片的 id

    // if (activeIndex + 1 == numberOfImgs - 1) {
    //     nextIndex = 0
    // } else {
    //     nextIndex = activeIndex + 1
    // }
    var i = (numberOfImgs + activeIndex + offset) % numberOfImgs
    return i
}

var bindEventSlide = function() {
    var selector = '.slide-button'
    bindAll(selector, 'click', function(event) {
        log('click next')
        var button = event.target
        // 找到 slide div
        var slide = button.parentElement
        // 求出 button 的 data-offset
        // 上一张按钮的 offset 是 -1
        // 下一张按钮的 offset 是 1
        var offset = Number(button.dataset.offset)
        var index = nextIndex(slide, offset)
        showImageAtIndex(slide, index)
    })
}

var bindEventIndicator = function() {
    var selector = '.slide-indi'
    bindAll(selector, 'mouseover', function(event) {
        log('indi 小圆点')
        var self = event.target
        var index = Number(self.dataset.index)
        log('index', index, typeof(index))
        var slide = self.closest('.slide')
        // 直接播放第 n 张图片
        showImageAtIndex(slide, index)
    })
}

var playNextImage = function() {
    var slide = e('.slide')
    // 求出下一张图片的 index
    var index = nextIndex(slide, 1)
    // 显示下一张图片
    showImageAtIndex(slide, index)
}

var autoPlay = function() {
    var interval = 2000
    setInterval(function() {
        playNextImage()
    }, interval)
}

var __main = () => {
    bindEventSlide()
    bindEventIndicator()
    autoPlay()
}

__main()
