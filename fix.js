const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir('src', function(filePath) {
    if (!filePath.endsWith('.js') && !filePath.endsWith('.jsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    if (content.includes('alert(')) {
        content = content.replace(/\balert\(/g, 'toast.error(');
        
        if (!content.includes('import toast') && !content.includes('import { toast }')) {
            content = "import toast from 'react-hot-toast';\n" + content;
        }
        changed = true;
    }

    if (content.includes('Loading...<') || content.includes('Loading delivery boys...<')) {
        content = content.replace(
            />Loading\.\.\.<\//g,
            '><div className="flex items-center justify-center gap-2"><Loader2 className="animate-spin w-5 h-5" /> Loading...</div></'
        );
        content = content.replace(
            />Loading delivery boys\.\.\.<\//g,
            '><div className="flex items-center justify-center gap-2"><Loader2 className="animate-spin w-4 h-4" /> Loading delivery boys...</div></'
        );
        
        if (!content.includes('import { Loader2 }')) {
            content = "import { Loader2 } from 'lucide-react';\n" + content;
        }
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
    }
});
