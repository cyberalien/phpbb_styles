$(document).ready(function()
{
	var image2 = {'data': "R0lGODlhHwAgANUAALJNAB\/gAOAfAPkGAP0CALRLAAb5APoFAEq1AC\/QAE2yAN8gAAT7AMU6AB7hAAP8APsEAAX6ALhHACjXAMA\/ADnGAEe4ADTLAEG+AAH+ANcoANwjALdIADbJANMsAMo1AEC\/ACzTACLdAEyzACXaADvEALxDAES7AEW6ACDfAOEeALVKALpFAEi3ALNMANItADrFACTbAL1CANolANgnAMs0AEu0AD7BAM4xAME+AP8AAAD\/AAAAAAAAAAAAAAAAACH\/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjA0ODAxMTc0MDcyMDY4MTE4ODNCRTlBRDgxRTFBMUFFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM0RUEyOEQ2MEFFRTExRTE5MUY1Qzk5OTAyRDIxNUZBIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM0RUEyOEQ1MEFFRTExRTE5MUY1Qzk5OTAyRDIxNUZBIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDM4MDExNzQwNzIwNjgxMUIwNzFFNkY3Nzc3RjQ4RDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDQ4MDExNzQwNzIwNjgxMTg4M0JFOUFEODFFMUExQUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw\/eHBhY2tldCBlbmQ9InIiPz4B\/\/79\/Pv6+fj39vX08\/Lx8O\/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB\/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQAAAAAACwAAAAAHwAgAAAGq0CdcEgsGo9CAXLJ1BEAoqa0uIHtptODBPS4Ypsf0m78Zb4UjLG3bOQE1GR2UYCCx+W6gatjv8s9CX1+ZQ0IBoJrZTJviIlYAgiNg00QABOSk0wzFZiZRxAmJ2mdWA0xnWpTNApdqI5HBYyur0ULGLOpSAMrJbi5Rzghvr9FNSOHw7QsDsnEQiotzcQHAIHSfhoX17kEFBYR23E5KeGpCzYZ5WMFzOpjN+5qQQA7","size":1518,"colors":2};

	/*
		Parse sample
	*/
	function parseColors(image, list)
	{
		/*
			Initialize image
		*/
		if(typeof(image.raw) == 'undefined')
		{
			image.invalid = false;
			image.raw = b64.decode(image.data);
			image.start = 13;
			if(typeof(image.width) == 'undefined' || typeof(image.height) == 'undefined')
			{
				image.width = image.raw.charCodeAt(6) + image.raw.charCodeAt(7) * 256;
				image.height = image.raw.charCodeAt(8) + image.raw.charCodeAt(9) * 256;
			}
			if(typeof(image.psize) == 'undefined')
			{
				image.psize = 1 << ((image.raw.charCodeAt(10) & 7) + 1);
			}
			if(!image.width || !image.height || !image.psize)
			{
				image.invalid = true;
				return image.data;
			}
			if(typeof(image.palette) == 'undefined')
			{
				image.palette = [];
				for(var i=0; i<image.psize; i++)
				{
					var color = {
						'c0'	: image.raw.charCodeAt(image.start + i * 3),
						'c1'	: image.raw.charCodeAt(image.start + i * 3 + 1),
						'c2'	: image.raw.charCodeAt(image.start + i * 3 + 2),
						'ignore'	: true,
						'start'	: image.start + i * 3
					};
					if(color.c0 != color.c1 || color.c0 != color.c2)
					{
						color.total = color.c0 + color.c1 + color.c2;
						color.ignore = false;
						image.palette.push(color);
					}
				}
				if(!image.palette.length)
				{
					image.invalid = true;
					return image.data;
				}
			}
		}
		if(image.invalid) return image.data;
		/*
			Replace colors
		*/
		var data = image.raw,
			list2 = [];
		for(var i=0; i<list.length; i++)
		{
			list2[i] = colors.color(list[i]).rgb;
		}
		for(var i=0; i<image.palette.length; i++)
		{
			var rgb = {'r': 0, 'g': 0, 'b': 0},
				item = image.palette[i];
			for(var j=0; j<list2.length; j++)
			{
				if(item['c' + j] > 0)
				{
					rgb.r += list2[j].r * item['c' + j];
					rgb.g += list2[j].g * item['c' + j];
					rgb.b += list2[j].b * item['c' + j];
				}
			}
			rgb.r = Math.floor(rgb.r / item.total);
			rgb.g = Math.floor(rgb.g / item.total);
			rgb.b = Math.floor(rgb.b / item.total);
			var str = String.fromCharCode(rgb.r) + String.fromCharCode(rgb.g) + String.fromCharCode(rgb.b);
			data = data.slice(0, item.start) + str + data.slice(item.start + 3);
		}
		return b64.encode(data);
	};

	/*
		Styles demo
	*/
	$('a.top-link-color').each(function()
	{
		var colors = $(this).data('colors').split(',');
		$(this).css({'background-image': 'url(data:image/gif;base64,' + parseColors((colors.length == 2) ? image2 : image2, colors) + ')', 'display': 'inline-block'});
		$(this).attr('title', $(this).text());
	});
});

