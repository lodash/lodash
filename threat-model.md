# The Lodash Threat Model

The Lodash threat model defines what Lodash trusts and does not trust when executing within a JavaScript environment. Lodash is a general-purpose utility library that operates within the same trust boundaries as the code that calls it. Therefore, vulnerabilities requiring the compromise of trusted elements — such as the JavaScript runtime, the host environment, or developer-controlled inputs — lie outside the scope of this threat model.

For a vulnerability to be considered within scope, it must result from Lodash itself violating its documented behavior or failing to maintain integrity, confidentiality, or availability under its standard usage assumptions.


## Elements Lodash Does NOT Trust

1. **Data provided to Lodash functions**  
Lodash treats all input data (arrays, objects, strings, functions, etc.) as untrusted. It does not attempt to validate or sanitize the semantic correctness of inputs — it operates on values as they are given.  
*If an untrusted input can cause Lodash to execute behavior beyond what is documented — such as prototype pollution, type confusion, memory exhaustion, or code injection — that would indicate a security vulnerability.*

2. **Untrusted network sources or user-controlled data**  
Any input derived from unvalidated user input, network responses, file contents, or deserialized data is untrusted. Lodash does not perform input isolation or sandboxing.

3. **Tampering with Lodash internals at runtime**  
Modifying Lodash’s internal symbols, monkey-patching its functions, or overwriting internal references at runtime is outside the trusted boundary.  
*If such modification changes Lodash behavior, that reflects a compromise of trusted code, not a Lodash vulnerability.*


## Elements Lodash Trusts

1. **The JavaScript runtime and its standard library**  
Lodash assumes a correct, uncompromised runtime environment (e.g., Node.js, browser). Vulnerabilities in the runtime (e.g., prototype chain issues, engine crashes) are out of scope.

2. **The environment and its configuration**  
Lodash relies on the correct functioning of the host environment (Node.js, browser, Deno, etc.) and any global objects or APIs it uses (e.g., `Object`, `Array`, `Function`, `JSON`).

3. **The code that invokes Lodash**  
The application or library using Lodash is responsible for validating user input, performing security checks, and handling execution context appropriately.

4. **Installed package integrity**  
Lodash assumes that the package installed (via npm, cdn, etc.) has not been tampered with and originates from the legitimate Lodash distribution channel.  
*Supply-chain compromise or malicious clones are not considered Lodash vulnerabilities.*

5. **The privileges and permissions of the execution context**  
Lodash inherits the privileges of the user or process that invokes it. Misuse or over-privileged execution environments (e.g., running as root, or with excessive browser permissions) are not within scope.

## Examples of Vulnerabilities (in scope)

- **Prototype Pollution ([CWE-1321](https://cwe.mitre.org/data/definitions/1321.html))**  
  If a Lodash function (e.g., `merge`, `defaultsDeep`, or `set`) allows modification of `Object.prototype` properties via untrusted input (e.g., `__proto__` keys) due to insufficient sanitization, it is in scope.  
  This class of vulnerability has been observed in prior Lodash versions (e.g., [CVE-2019-10744](https://www.cve.org/CVERecord?id=CVE-2019-10744)).

- **Unexpected code execution ([CWE-94](https://cwe.mitre.org/data/definitions/94.html))**  
  If a Lodash method (e.g., `template()`) executes attacker-controlled input as code without documented warnings or sanitization requirements, that is a Lodash vulnerability (e.g., [CVE-2021-23337](https://nvd.nist.gov/vuln/detail/CVE-2021-23337)).

- **Denial of Service (DoS) through logic flaws ([CWE-400](https://cwe.mitre.org/data/definitions/400.html))**  
  If Lodash enters unbounded recursion, excessive memory usage, or hangs when operating on otherwise valid inputs within documented usage limits, this is a vulnerability in Lodash (e.g, [CVE-2020-28500](https://www.cve.org/CVERecord?id=CVE-2020-28500)).


## Examples of Non-Vulnerabilities (out of scope)

### Malicious Third-Party Packages ([CWE-1357](https://cwe.mitre.org/data/definitions/1357.html))

If a project includes a malicious dependency that overrides Lodash behavior or injects malicious code into Lodash’s namespace, it does not represent a Lodash vulnerability. Lodash trusts its runtime and installation context.

### Unvalidated Application Input

Applications using Lodash are responsible for input validation. Passing attacker-controlled data directly into Lodash functions (e.g., `_.merge(req.body, config)`) is an application bug, not a Lodash vulnerability.

### Prototype Pollution via Trusted Code

If a developer intentionally merges user input into global objects or fails to isolate data structures, that is a misuse of Lodash’s documented API, not a Lodash defect.

### Vulnerabilities in the JavaScript Runtime or Platform

If a Lodash method triggers a bug in the JavaScript engine (e.g., V8, SpiderMonkey, JavaScriptCore) that leads to memory corruption or incorrect behavior, the vulnerability lies in the engine, not Lodash.

### Environmental Misconfiguration ([CWE-15](https://cwe.mitre.org/data/definitions/15.html))

Issues arising from misconfigured execution environments, such as running outdated Node.js versions or insecure Content Security Policies in browsers, are not considered Lodash vulnerabilities.

### Supply Chain Compromise

Tampering with Lodash packages in the npm registry, MITM attacks during installation, or local file system manipulation are not vulnerabilities in Lodash itself.


## Summary

Lodash is a utility library operating entirely within the trust boundary of its caller. Vulnerabilities in scope are limited to cases where **Lodash fails to uphold its documented behavior** in the presence of **untrusted input**, without assuming compromise of trusted components such as the runtime, the operating system, or the invoking application code.
