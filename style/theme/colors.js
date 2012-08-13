/*
    Color convertions
*/

var colors = {
  
    hsv2rgb: function(h, s, v)
    {
        h /= 360;
        s /= 100;
        v /= 100;
        var color = {};
        if(s == 0)
        {
            color.r = color.g = color.b = Math.round(v * 255);
        }
        else
        {
            var var_h = h * 6;
            if (var_h == 6) var_h = 0;
            var var_i = Math.floor(var_h);
            var var_1 = v * (1 - s);
            var var_2 = v * (1 - s * (var_h - var_i));
            var var_3 = v * (1 - s * (1 - (var_h - var_i)));
            if(var_i == 0)
            { 
                var_r = v; 
                var_g = var_3; 
                var_b = var_1;
            }
            else if(var_i == 1)
            {
                var_r = var_2;
                var_g = v;
                var_b = var_1;
            }
            else if(var_i == 2)
            {
                var_r = var_1;
                var_g = v;
                var_b = var_3;
            }
            else if(var_i == 3)
            {
                var_r = var_1;
                var_g = var_2;
                var_b = v;
            }
            else if(var_i == 4)
            {
                var_r = var_3;
                var_g = var_1;
                var_b = v;
            }
            else
            {
                var_r = v;
                var_g = var_1;
                var_b = var_2
            }
            color.r = Math.round(var_r * 255);
            color.g = Math.round(var_g * 255);
            color.b = Math.round(var_b * 255);
        }
        return color;
    },
    
    hsv2hex: function(h, s, v)
    {
        var color = colors.hsv2rgb(h, s, v);
        return ((color.r < 16) ? '0' : '') + color.r.toString(16) + ((color.g < 16) ? '0' : '') + color.g.toString(16) + ((color.b < 16) ? '0' : '') + color.b.toString(16);
    },
  
    // (h, s, l, round = true)
    hsl2rgb: function()
    {
        var h = arguments[0], 
            s = arguments[1],
            l = arguments[2],
            round = (arguments.length > 3) ? arguments[3] : true;
        function valore(n1, n2, hue)
        {
            while(hue>=360) hue -= 360;
            while(hue<0) hue += 360;
        
            if(hue >= 240) return n1;
            if(hue < 60) return n1 + (n2 - n1) * hue / 60;
            if(hue < 180) return n2;
            return n1 + (n2 - n1) * (240 - hue) / 60;
        }
    
        while(h >= 360) h -= 360;
        while(h < 0) h += 360;
        if(s > 100) s = 100;
        if(s < 0) s = 0;
        if(l > 100) l = 100;
    
        var lum = l / 100,
            sat = s / 100,
            m1, m2, c1, c2, c3;
            
        if(lum <= 0.5) m2 = lum * (1 + sat);
        else m2 = lum + sat * (1 - lum);
    
        m1 = 2 * lum - m2;
    
        c1 = valore(m1, m2, h+120);
        c2 = valore(m1, m2, h);
        c3 = valore(m1, m2, h-120);
    
        if(s == 0 && h == 0)
        {
            c1 = lum;
            c2 = lum;
            c3 = lum;
        }
        return {
            'r': (round) ? Math.round(c1 * 255) : c1 * 255,
            'g': (round) ? Math.round(c2 * 255) : c2 * 255,
            'b': (round) ? Math.round(c3 * 255) : c3 * 255
        };
    },
    
    hsl2hex: function(h, s, l)
    {
        var rgb = colors.hsl2rgb(h, s, l, false);
        return colors.rgb2hex(rgb.r, rgb.g, rgb.b);
    },
    
    rgb2hex: function(r, g, b)
    {
        r = Math.round(r);
        if(r > 255) r = 255;
        if(r < 0) r = 0;
        g = Math.round(g);
        if(g > 255) g = 255;
        if(g < 0) g = 0;
        b = Math.round(b);
        if(b > 255) b = 255;
        if(b < 0) b = 0;
        return ((r < 16) ? '0' : '') + r.toString(16) + ((g < 16) ? '0' : '') + g.toString(16) + ((b < 16) ? '0' : '') + b.toString(16);
    },
    
    hex2hsl: function() // (color) | (color, round)
    {
        var rgb = colors.hex2rgb(arguments[0]);
        return (typeof(rgb) == 'boolean') ? false : colors.rgb2hsl(rgb.r, rgb.g, rgb.b, (arguments.length > 1) ? arguments[1] : false);
    },
    
    hex2rgb: function(color)
    {
        var rgb = {'r': 0, 'g': 0, 'b': 0};
        if((color.length == 7 || color.length == 4) && color.slice(0, 1) == '#') color = color.slice(1);
        if(color.length == 6)
        {
            rgb.r = parseInt(color.slice(0, 2), 16);
            rgb.g = parseInt(color.slice(2, 4), 16);
            rgb.b = parseInt(color.slice(4, 6), 16);
            return (isNaN(rgb.r) || isNaN(rgb.g) || isNaN(rgb.b)) ? false : rgb;
        }
        if(color.length == 3)
        {
            rgb.r = parseInt(color.slice(0, 1) + color.slice(0, 1), 16);
            rgb.g = parseInt(color.slice(1, 2) + color.slice(1, 2), 16);
            rgb.b = parseInt(color.slice(2, 3) + color.slice(2, 3), 16);
            return (isNaN(rgb.r) || isNaN(rgb.g) || isNaN(rgb.b)) ? false : rgb;
        }
        return false;
    },
    
    rgb2hsl: function() // (r, g, b) | (r, g, b, round)
    {
        var c1 = colors.minmax_rgb(arguments[0]) / 255,
            c2 = colors.minmax_rgb(arguments[1]) / 255,
            c3 = colors.minmax_rgb(arguments[2]) / 255,
            kmin = Math.min(c1, Math.min(c2, c3)),
            kmax = Math.max(c1, Math.max(c2, c3)),
            l = (kmax + kmin) / 2,
            s, h;
        if(kmax == kmin)
        {
            s = h = 0;
        }
        else
        {
            if(l < 0.5) s = (kmax - kmin) / (kmax + kmin);
            else s = (kmax - kmin) / (2 - kmax - kmin);
            var delta = kmax - kmin;
            if(kmax == c1) h = (c2 - c3) / delta;
            if(kmax == c2) h = 2 + (c3 - c1) / delta;
            if(kmax == c3) h = 4 + (c1 - c2) / delta;
            h = h * 60;
            if(h < 0) h += 360;
        }
    
        if(arguments.length > 3 && arguments[3] == false)
        {
            // don't round numbers
            return {'h': h, 's': s * 100, 'l': l * 100};
        }
        return {'h': Math.round(h), 's': Math.round(s * 100), 'l': Math.round(l * 100)};
    },
    
    /*
        Color cleanup functions
    */
    
    minmax_hsl: function(color)
    {
        if(arguments.length > 1 && arguments[1] == 'true')
        {
            // round
            color.h = Math.round(color.h);
            color.s = Math.round(color.s);
            color.l = Math.round(color.l);
        }
        while(color.h < 0) color.h += 360;
        while(color.h >= 360) color.h -= 360;
        if(color.s < 0) color.s = 0;
        if(color.s > 100) color.s = 100;
        if(color.l < 0) color.l = 0;
        if(color.l > 100) color.l = 100;
        return color;
    },
    
    minmax_rgb: function(color)
    {
        if(typeof(color) == 'string') color = parseInt(color, 10);
        if(typeof(color) == 'number')
        {
            if(color > 255) color = 255;
            if(color < 0) color = 0;
            return color;
        }
        if(arguments.length > 1 && arguments[1] == 'true')
        {
            // round
            color.r = Math.round(color.r);
            color.g = Math.round(color.g);
            color.b = Math.round(color.b);
        }
        if(color.r > 255) color.r = 255;
        if(color.r < 0) color.r = 0;
        if(color.g > 255) color.g = 255;
        if(color.g < 0) color.g = 0;
        if(color.b > 255) color.b = 255;
        if(color.b < 0) color.b = 0;
        return color;
    },
    
    // check color value, convert it
    color: function(data)
    {
        var color = {
            'hex'   : '',
            'rgb'   : {},
            'hsl'   : {},
            'gray'  : true
        },
        round = (arguments.length > 1) ? arguments[1] : false;
        // check if color is a hex
        if(typeof(data) == 'string')
        {
            if((data.length == 7 || data.length == 4) && data.slice(0, 1) == '#') data = data.slice(1);
            if((data.length == 6 || data.length == 3) && data.match(/^[a-fA-F0-9]+$/))
            {
                // hex color
                color.hex = '#' + data;
                color.rgb = colors.hex2rgb(color.hex);
                if(color.rgb === false) return false;
                color.hsl = colors.rgb2hsl(color.rgb.r, color.rgb.g, color.rgb.b, round);
                color.gray = (color.rgb.r == color.rgb.g && color.rgb.g == color.rgb.b);
                return color;
            }
            if(data.slice(0, 4) == 'hue:' || data.slice(0, 2) == 'h:')
            {
                // hue
                data = parseInt(data.slice((data.slice(0, 2) == 'h:') ? 2 : 4), 10);
                if(!isNaN(data) && data >= 0 && data < 360)
                {
                    color.hsl = {
                        'h' : data,
                        's' : 75,
                        'l' : 50
                    };
                    color.rgb = colors.hsl2rgb(color.hsl.h, color.hsl.s, color.hsl.l, round);
                    color.hex = '#' + colors.rgb2hex(color.rgb.r, color.rgb.g, color.rgb.b);
                    color.gray = false;
                    return color;
                }
            }
            return false;
        }
        if(typeof(data) == 'object')
        {
            if(typeof(data.hsl) == 'object' && typeof(data.rgb) == 'object')
            {
                return data;
            }
            if(typeof(data.h) == 'number' && typeof(data.s) == 'number' && typeof(data.l) == 'number')
            {
                // hsl
                color.hsl = {'h': data.h, 's': data.s, 'l': data.l};
                color.rgb = colors.hsl2rgb(color.hsl.h, color.hsl.s, color.hsl.l, round);
                color.hex = '#' + colors.rgb2hex(color.rgb.r, color.rgb.g, color.rgb.b);
                color.gray = (color.hsl.l <= 0 || color.hsl.l >= 100 || color.hsl.s <= 0);
                return color;
            }
            if(typeof(data.r) == 'number' && typeof(data.g) == 'number' && typeof(data.b) == 'number')
            {
                // rgb
                color.rgb = {'r': data.r, 'g': data.g, 'b': data.b};
                color.hex = '#' + colors.rgb2hex(color.rgb.r, color.rgb.g, color.rgb.b);
                color.hsl = colors.rgb2hsl(color.rgb.r, color.rgb.g, color.rgb.b, round);
                color.gray = (color.rgb.r == color.rgb.g && color.rgb.g == color.rgb.b);
                return color;
            }
        }
        return false;
    },
    
    // convert some color to rgb
    rgb: function(color)
    {
        var round = (arguments.length > 1) ? arguments[1] : false;
        // hex
        if(typeof(color) == 'string') return colors.hex2rgb(color);
        // invalid
        if(typeof(color) != 'object') return false;
        // full color object
        if(typeof(color.rgb) == 'object')
        {
            if(!round) return color.rgb;
            return {
                'r':    Math.max(Math.min(Math.round(color.rgb.r), 255), 0),
                'g':    Math.max(Math.min(Math.round(color.rgb.g), 255), 0),
                'b':    Math.max(Math.min(Math.round(color.rgb.b), 255), 0)
            }
        }
        // rgb
        if(typeof(color.r) == 'number')
        {
            return {
                'r':    (round) ? Math.max(Math.min(Math.round(color.r), 255), 0) : color.r,
                'g':    (round) ? Math.max(Math.min(Math.round(color.g), 255), 0) : color.g,
                'b':    (round) ? Math.max(Math.min(Math.round(color.b), 255), 0) : color.b
            }
        }
        // hsl
        if(typeof(color.h) == 'number')
        {
            return colors.hsl2rgb(color.h, color.s, color.l, round);
        }
        // invalid color
        return false;
    },
    
    // convert some color to hsl
    hsl: function(color)
    {
        // hex
        if(typeof(color) == 'string') return colors.hex2hsl(color);
        // invalid
        if(typeof(color) != 'object') return false;
        // hsl
        if(typeof(color.hsl) == 'object') return color.hsl;
        if(typeof(color.h) == 'number') return {'h': color.h, 's': color.s, 'l': color.l};
        // rgb
        if(typeof(color.r) == 'number')
        {
            return colors.rgb2hsl(color.r, color.g, color.b, false);
        }
        // invalid color
        return false;
    },
    
    // check if color is gray
    gray: function(color)
    {
        // hex
        if(typeof(color) == 'string')
        {
            color = colors.hex2rgb(color);
            return (color.r == color.g && color.g == color.b);
        }
        // invalid color
        if(typeof(color) != 'object') return false;
        // rgb
        if(typeof(color.rgb) == 'object') return (color.rgb.r == color.rgb.g && color.rgb.g == color.rgb.b);
        if(typeof(color.r) == 'number') return (color.r == color.g && color.g == color.b);
        // hsl
        if(typeof(color.h) == 'number') return (color.s <= 0 || color.l <= 0 || color.l >= 100);
        return false;
    },
    
    // check string. returns 3/6 characters long rgb color
    validateInputHTML: function(color)
    {
        if((color.length == 7 || color.length == 4) && color.slice(0, 1) == '#') color = color.slice(1);
        if(color.length == 6 || color.length == 3)
        {
            return (color.match(/^[a-fA-F0-9]+$/)) ? color : false;
        }
        return false;
    }    
    
};