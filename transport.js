/*globals BPM_PLUGIN */

BPM_PLUGIN.compileTransport = function(code, context, filename) {
  var format = context.settings['spade:format'];
  if (format === 'none') { return code };

  var ret = '',
      packageName = context['package'].name,
      id = packageName+'/'+context.moduleId;

  // Register package, probably a better way to do this
  if (id.match(/^[^\/]+\/main$/)) {
    var pkg = context['package'];
    ret += 'spade.register("'+packageName+'", '+JSON.stringify(pkg)+');\n\n';
  }

  if (format === 'function') {
    code = 'function(require, exports, __module, ARGV, ENV, __filename){\n'+code+'\n}';
  } else {
    code = context.minify("(function(require, exports, __module, ARGV, ENV, __filename){"+code+"\n});");
    code = JSON.stringify(code);
  }

  ret += 'spade.register("'+id+'", '+code+');';

  return ret;
};

